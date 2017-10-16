'use strict';

const { keys, assign, create } = Object;
export { keys, assign, create }
export const Is = x => x != null;

Is.arr = Array.isArray
Is.obj = x => 'object' === typeof x && !!x;
Is.empty = x => {
  for (let i in x)
    return false;
  return !x || Is.obj(x);
}


// export function map(o, cb, ctx) {
//   return keys(o).map((name, i) => cb.call(ctx, {
//     i, name, key: name +'-'+ i, value: o[ name ]
//   }));
// }
export function map(o, cb, ctx) {
  return keys(o).map((name, i) => cb.call(ctx, o[ name ], name, i));
}

