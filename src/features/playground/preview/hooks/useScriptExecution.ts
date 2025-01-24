import { useCallback, useEffect, useState } from 'react';
import { moves } from '../../constants';
import type { Block, ScriptState, SpriteState, blockArg } from '../../types';

const defaultScriptState = (script: Block[]) => ({
  script,
  active: false,
  stepDelay: 0,
  stepCount: [0],
  loopCount: [0],
  nestStatus: [true],
});

export const useScriptExecution = (
  scripts: Block[][],
  setState: React.Dispatch<React.SetStateAction<SpriteState>>,
) => {
  const [scriptStates, setScriptStates] = useState<ScriptState[]>(
    scripts?.map((script) => defaultScriptState(script)),
  );

  const [stepSpeed, setStepSpeed] = useState(1);

  const updateScriptState = useCallback(
    (updateFn: (newScriptStates: ScriptState[]) => void) => {
      const newScriptStates = structuredClone(scriptStates);
      updateFn(newScriptStates);
      setScriptStates([...newScriptStates]);
    },
    [scriptStates],
  );
  const interval = useCallback(
    (i: number, script: Block[], stepCount: number[]) => {
      if (stepCount[0] >= script.length) {
        updateScriptState((scriptStates) => {
          scriptStates[i] = defaultScriptState(scriptStates[i].script);
        });
        return;
      }

      const block = script?.[stepCount[0]];

      if (block === undefined) return;

      updateScriptState((scriptStates) => {
        const step = (block: blockArg): void | string | undefined => {
          if (typeof block === 'string') {
            return block;
          }
          if (block instanceof Array) return;
          return moves(step, block.arg, scriptStates[i], 0, setState)[block.id]?.();
        };
        step(block);
        scriptStates[i].stepCount[scriptStates[i].stepCount.length - 1] += 1;
      });
    },
    [updateScriptState, setState],
  );

  const intervalId = useCallback(
    ({ script, active, stepDelay, stepCount }: ScriptState, i: number) => {
      if (active) {
        return setInterval(() => interval(i, script, stepCount), (stepDelay ?? stepSpeed) * 1000);
      }
      return undefined;
    },
    [interval, stepSpeed],
  );

  useEffect(() => {
    const intervalIds = scriptStates.map(intervalId);

    return () => intervalIds?.forEach((intervalId) => clearInterval(intervalId));
  }, [scriptStates, stepSpeed, intervalId]);

  const handleStartButtonClick = () => {
    setScriptStates(
      scriptStates
        .filter(({ script }) => script[0]?.id === 0)
        .map((scriptState) => ({
          ...scriptState,
          active: !scriptState.active,
          stepDelay: 0,
        })),
    );
  };
  return { scriptStates, handleStartButtonClick, setStepSpeed }; // フックから必要なデータと関数を返す
};
