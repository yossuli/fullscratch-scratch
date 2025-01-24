type NotUndefinedT<T> = {
  [K in keyof T]: Exclude<T[K], undefined | null>;
};

const isDefined = <T,>(value: T): value is Exclude<T, undefined | null> => {
  return value !== undefined && value !== null;
};

const makeNotUndefinedArgs = <T extends Record<string, undefined | null | unknown>>(
  hasUndefinedArgs: T,
): NotUndefinedT<T> | false => {
  const notUndefinedArgs = {} as NotUndefinedT<T>;

  for (const key in hasUndefinedArgs) {
    const value = hasUndefinedArgs[key];

    if (isDefined(value)) {
      notUndefinedArgs[key] = value;
    } else {
      return false;
    }
  }

  return notUndefinedArgs;
};

export const DefinedWrapper = <T extends Record<string, unknown>>({
  nullableArgs,
  childrenFn: children,
}: {
  nullableArgs: T;
  childrenFn: (args: NotUndefinedT<T>) => React.ReactNode;
}) => {
  if (!(nullableArgs instanceof Object)) {
    throw new Error('Invalid undefinableArgs');
  }

  const notNullableArgs = makeNotUndefinedArgs(nullableArgs);

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  return notNullableArgs ? children(notNullableArgs) : null;
};
