// prelude.ls 0.6.0
// Copyright (c) 2012 George Zahariev
// Released under the MIT License
// raw.github.com/gkz/prelude-ls/master/LICNSE
this.prelude = function(){
  exports = {};
  var objToFunc, each, map, filter, reject, partition, find, first, head, tail, last, initial, empty, values, keys, len, cons, append, join, reverse, foldl, fold, foldl1, fold1, foldr, foldr1, unfold, unfoldr, andList, orList, any, all, unique, sort, sortBy, compare, sum, product, average, mean, concat, concatMap, listToObj, maximum, minimum, scanl, scan, scanl1, scan1, scanr, scanr1, replicate, take, drop, splitAt, takeWhile, dropWhile, span, breakIt, zip, zipWith, zipAll, zipAllWith, compose, curry, id, flip, fix, lines, unlines, words, unwords, max, min, negate, abs, signum, quot, rem, div, mod, recip, pi, tau, exp, sqrt, ln, pow, sin, tan, cos, asin, acos, atan, atan2, truncate, round, ceiling, floor, isItNaN, even, odd, gcd, lcm, installPrelude, prelude, out$ = typeof exports != 'undefined' && exports || this, toString$ = {}.toString, join$ = [].join, split$ = ''.split, slice$ = [].slice;
out$.objToFunc = objToFunc = objToFunc = function(obj){
  return function(key){
    return obj[key];
  };
};
out$.each = each = curry$(function(f, xs){
  var i$, x, len$;
  if (toString$.call(xs).slice(8, -1) === 'Object') {
    for (i$ in xs) {
      x = xs[i$];
      f(x);
    }
  } else {
    for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
      x = xs[i$];
      f(x);
    }
  }
  return xs;
});
out$.map = map = curry$(function(f, xs){
  var type, key, x, res$, i$, len$, result, results$ = {};
  if (toString$.call(f).slice(8, -1) !== 'Function') {
    f = objToFunc(f);
  }
  type = toString$.call(xs).slice(8, -1);
  if (type === 'Object') {
    for (key in xs) {
      x = xs[key];
      results$[key] = f(x);
    }
    return results$;
  } else {
    res$ = [];
    for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
      x = xs[i$];
      res$.push(f(x));
    }
    result = res$;
    if (type === 'String') {
      return join$.call(result, '');
    } else {
      return result;
    }
  }
});
out$.filter = filter = curry$(function(f, xs){
  var type, key, x, res$, i$, len$, result, results$ = {};
  if (toString$.call(f).slice(8, -1) !== 'Function') {
    f = objToFunc(f);
  }
  type = toString$.call(xs).slice(8, -1);
  if (type === 'Object') {
    for (key in xs) {
      x = xs[key];
if (f(x)) {
        results$[key] = x;
      }
    }
    return results$;
  } else {
    res$ = [];
    for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
      x = xs[i$];
      if (f(x)) {
        res$.push(x);
      }
    }
    result = res$;
    if (type === 'String') {
      return join$.call(result, '');
    } else {
      return result;
    }
  }
});
out$.reject = reject = curry$(function(f, xs){
  var type, key, x, res$, i$, len$, result, results$ = {};
  if (toString$.call(f).slice(8, -1) !== 'Function') {
    f = objToFunc(f);
  }
  type = toString$.call(xs).slice(8, -1);
  if (type === 'Object') {
    for (key in xs) {
      x = xs[key];
if (!f(x)) {
        results$[key] = x;
      }
    }
    return results$;
  } else {
    res$ = [];
    for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
      x = xs[i$];
      if (!f(x)) {
        res$.push(x);
      }
    }
    result = res$;
    if (type === 'String') {
      return join$.call(result, '');
    } else {
      return result;
    }
  }
});
out$.partition = partition = curry$(function(f, xs){
  var type, passed, failed, key, x, i$, len$;
  if (toString$.call(f).slice(8, -1) !== 'Function') {
    f = objToFunc(f);
  }
  type = toString$.call(xs).slice(8, -1);
  if (type === 'Object') {
    passed = {};
    failed = {};
    for (key in xs) {
      x = xs[key];
      (f(x) ? passed : failed)[key] = x;
    }
  } else {
    passed = [];
    failed = [];
    for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
      x = xs[i$];
      (f(x) ? passed : failed).push(x);
    }
    if (type === 'String') {
      passed = join$.call(passed, '');
      failed = join$.call(failed, '');
    }
  }
  return [passed, failed];
});
out$.find = find = curry$(function(f, xs){
  var i$, x, len$;
  if (toString$.call(f).slice(8, -1) !== 'Function') {
    f = objToFunc(f);
  }
  if (toString$.call(xs).slice(8, -1) === 'Object') {
    for (i$ in xs) {
      x = xs[i$];
      if (f(x)) {
        return x;
      }
    }
  } else {
    for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
      x = xs[i$];
      if (f(x)) {
        return x;
      }
    }
  }
});
out$.head = head = out$.first = first = function(xs){
  if (!xs.length) {
    return;
  }
  return xs[0];
};
out$.tail = tail = function(xs){
  if (!xs.length) {
    return;
  }
  return xs.slice(1);
};
out$.last = last = function(xs){
  if (!xs.length) {
    return;
  }
  return xs[xs.length - 1];
};
out$.initial = initial = function(xs){
  if (!xs.length) {
    return;
  }
  return xs.slice(0, xs.length - 1);
};
out$.empty = empty = function(xs){
  var x;
  if (toString$.call(xs).slice(8, -1) === 'Object') {
    for (x in xs) {
      return false;
    }
    return true;
  }
  return !xs.length;
};
out$.values = values = function(obj){
  var i$, x, results$ = [];
  for (i$ in obj) {
    x = obj[i$];
    results$.push(x);
  }
  return results$;
};
out$.keys = keys = function(obj){
  var x, results$ = [];
  for (x in obj) {
    results$.push(x);
  }
  return results$;
};
out$.len = len = function(xs){
  if (toString$.call(xs).slice(8, -1) === 'Object') {
    xs = values(xs);
  }
  return xs.length;
};
out$.cons = cons = curry$(function(x, xs){
  if (toString$.call(xs).slice(8, -1) === 'String') {
    return x + xs;
  } else {
    return [x].concat(xs);
  }
});
out$.append = append = curry$(function(xs, ys){
  if (toString$.call(ys).slice(8, -1) === 'String') {
    return xs + ys;
  } else {
    return xs.concat(ys);
  }
});
out$.join = join = curry$(function(sep, xs){
  if (toString$.call(xs).slice(8, -1) === 'Object') {
    xs = values(xs);
  }
  return xs.join(sep);
});
out$.reverse = reverse = function(xs){
  if (toString$.call(xs).slice(8, -1) === 'String') {
    return join$.call((split$.call(xs, '')).reverse(), '');
  } else {
    return xs.slice().reverse();
  }
};
out$.fold = fold = out$.foldl = foldl = curry$(function(f, memo, xs){
  var i$, x, len$;
  if (toString$.call(xs).slice(8, -1) === 'Object') {
    for (i$ in xs) {
      x = xs[i$];
      memo = f(memo, x);
    }
  } else {
    for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
      x = xs[i$];
      memo = f(memo, x);
    }
  }
  return memo;
});
out$.fold1 = fold1 = out$.foldl1 = foldl1 = curry$(function(f, xs){
  return fold(f, xs[0], xs.slice(1));
});
out$.foldr = foldr = curry$(function(f, memo, xs){
  return fold(f, memo, xs.slice().reverse());
});
out$.foldr1 = foldr1 = curry$(function(f, xs){
  xs = xs.slice().reverse();
  return fold(f, xs[0], xs.slice(1));
});
out$.unfoldr = unfoldr = out$.unfold = unfold = curry$(function(f, b){
  var that;
  if ((that = f(b)) != null) {
    return [that[0]].concat(unfoldr(f, that[1]));
  } else {
    return [];
  }
});
out$.andList = andList = function(xs){
  var i$, len$, x;
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    if (!x) {
      return false;
    }
  }
  return true;
};
out$.orList = orList = function(xs){
  var i$, len$, x;
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    if (x) {
      return true;
    }
  }
  return false;
};
out$.any = any = curry$(function(f, xs){
  var i$, len$, x;
  if (toString$.call(f).slice(8, -1) !== 'Function') {
    f = objToFunc(f);
  }
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    if (f(x)) {
      return true;
    }
  }
  return false;
});
out$.all = all = curry$(function(f, xs){
  var i$, len$, x;
  if (toString$.call(f).slice(8, -1) !== 'Function') {
    f = objToFunc(f);
  }
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    if (!f(x)) {
      return false;
    }
  }
  return true;
});
out$.unique = unique = function(xs){
  var result, i$, x, len$;
  result = [];
  if (toString$.call(xs).slice(8, -1) === 'Object') {
    for (i$ in xs) {
      x = xs[i$];
      if (!in$(x, result)) {
        result.push(x);
      }
    }
  } else {
    for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
      x = xs[i$];
      if (!in$(x, result)) {
        result.push(x);
      }
    }
  }
  if (toString$.call(xs).slice(8, -1) === 'String') {
    return join$.call(result, '');
  } else {
    return result;
  }
};
out$.sort = sort = function(xs){
  return xs.concat().sort(function(x, y){
    switch (false) {
    case !(x > y):
      return 1;
    case !(x < y):
      return -1;
    default:
      return 0;
    }
  });
};
out$.sortBy = sortBy = curry$(function(f, xs){
  if (!xs.length) {
    return [];
  }
  return xs.concat().sort(f);
});
out$.compare = compare = curry$(function(f, x, y){
  switch (false) {
  case !(f(x) > f(y)):
    return 1;
  case !(f(x) < f(y)):
    return -1;
  default:
    return 0;
  }
});
out$.sum = sum = function(xs){
  var result, i$, x, len$;
  result = 0;
  if (toString$.call(xs).slice(8, -1) === 'Object') {
    for (i$ in xs) {
      x = xs[i$];
      result += x;
    }
  } else {
    for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
      x = xs[i$];
      result += x;
    }
  }
  return result;
};
out$.product = product = function(xs){
  var result, i$, x, len$;
  result = 1;
  if (toString$.call(xs).slice(8, -1) === 'Object') {
    for (i$ in xs) {
      x = xs[i$];
      result *= x;
    }
  } else {
    for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
      x = xs[i$];
      result *= x;
    }
  }
  return result;
};
out$.mean = mean = out$.average = average = function(xs){
  return sum(xs) / len(xs);
};
out$.concat = concat = function(xss){
  return fold(append, [], xss);
};
out$.concatMap = concatMap = curry$(function(f, xs){
  return fold(function(memo, x){
    return append(memo, f(x));
  }, [], xs);
});
out$.listToObj = listToObj = function(xs){
  var i$, len$, x, results$ = {};
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    results$[x[0]] = x[1];
  }
  return results$;
};
out$.maximum = maximum = function(xs){
  return fold1(curry$(function(x$, y$){
    return x$ > y$ ? x$ : y$;
  }), xs);
};
out$.minimum = minimum = function(xs){
  return fold1(curry$(function(x$, y$){
    return x$ < y$ ? x$ : y$;
  }), xs);
};
out$.scan = scan = out$.scanl = scanl = curry$(function(f, memo, xs){
  var last, x;
  last = memo;
  if (toString$.call(xs).slice(8, -1) === 'Object') {
    return [memo].concat((function(){
      var i$, ref$, results$ = [];
      for (i$ in ref$ = xs) {
        x = ref$[i$];
        results$.push(last = f(last, x));
      }
      return results$;
    }()));
  } else {
    return [memo].concat((function(){
      var i$, ref$, len$, results$ = [];
      for (i$ = 0, len$ = (ref$ = xs).length; i$ < len$; ++i$) {
        x = ref$[i$];
        results$.push(last = f(last, x));
      }
      return results$;
    }()));
  }
});
out$.scan1 = scan1 = out$.scanl1 = scanl1 = curry$(function(f, xs){
  return scan(f, xs[0], xs.slice(1));
});
out$.scanr = scanr = curry$(function(f, memo, xs){
  xs = xs.slice().reverse();
  return scan(f, memo, xs).reverse();
});
out$.scanr1 = scanr1 = curry$(function(f, xs){
  xs = xs.slice().reverse();
  return scan(f, xs[0], xs.slice(1)).reverse();
});
out$.replicate = replicate = curry$(function(n, x){
  var result, i;
  result = [];
  i = 0;
  for (; i < n; ++i) {
    result.push(x);
  }
  return result;
});
out$.take = take = curry$(function(n, xs){
  switch (false) {
  case !(n <= 0):
    if (toString$.call(xs).slice(8, -1) === 'String') {
      return '';
    } else {
      return [];
    }
    break;
  case !!xs.length:
    return xs;
  default:
    return xs.slice(0, n);
  }
});
out$.drop = drop = curry$(function(n, xs){
  switch (false) {
  case !(n <= 0):
    return xs;
  case !!xs.length:
    return xs;
  default:
    return xs.slice(n);
  }
});
out$.splitAt = splitAt = curry$(function(n, xs){
  return [take(n, xs), drop(n, xs)];
});
out$.takeWhile = takeWhile = curry$(function(p, xs){
  var result, i$, len$, x;
  if (!xs.length) {
    return xs;
  }
  if (toString$.call(p).slice(8, -1) !== 'Function') {
    p = objToFunc(p);
  }
  result = [];
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    if (!p(x)) {
      break;
    }
    result.push(x);
  }
  if (toString$.call(xs).slice(8, -1) === 'String') {
    return join$.call(result, '');
  } else {
    return result;
  }
});
out$.dropWhile = dropWhile = curry$(function(p, xs){
  var i, i$, len$, x;
  if (!xs.length) {
    return xs;
  }
  if (toString$.call(p).slice(8, -1) !== 'Function') {
    p = objToFunc(p);
  }
  i = 0;
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    if (!p(x)) {
      break;
    }
    ++i;
  }
  return drop(i, xs);
});
out$.span = span = curry$(function(p, xs){
  return [takeWhile(p, xs), dropWhile(p, xs)];
});
out$.breakIt = breakIt = curry$(function(p, xs){
  return span(compose$([not$, p]), xs);
});
out$.zip = zip = curry$(function(xs, ys){
  var result, i, ref$, len$, zs, j, len1$, z, ref1$;
  result = [];
  for (i = 0, len$ = (ref$ = [xs, ys]).length; i < len$; ++i) {
    zs = ref$[i];
    for (j = 0, len1$ = zs.length; j < len1$; ++j) {
      z = zs[j];
      if (i === 0) {
        result.push([]);
      }
      if ((ref1$ = result[j]) != null) {
        ref1$.push(z);
      }
    }
  }
  return result;
});
out$.zipWith = zipWith = curry$(function(f, xs, ys){
  var i$, ref$, len$, zs, results$ = [];
  if (toString$.call(f).slice(8, -1) !== 'Function') {
    f = objToFunc(f);
  }
  if (!xs.length || !ys.length) {
    return [];
  } else {
    for (i$ = 0, len$ = (ref$ = zip.call(this, xs, ys)).length; i$ < len$; ++i$) {
      zs = ref$[i$];
      results$.push(f.apply(this, zs));
    }
    return results$;
  }
});
out$.zipAll = zipAll = function(){
  var xss, result, i, len$, xs, j, len1$, x, ref$;
  xss = slice$.call(arguments);
  result = [];
  for (i = 0, len$ = xss.length; i < len$; ++i) {
    xs = xss[i];
    for (j = 0, len1$ = xs.length; j < len1$; ++j) {
      x = xs[j];
      if (i === 0) {
        result.push([]);
      }
      if ((ref$ = result[j]) != null) {
        ref$.push(x);
      }
    }
  }
  return result;
};
out$.zipAllWith = zipAllWith = function(f){
  var xss, i$, ref$, len$, xs, results$ = [];
  xss = slice$.call(arguments, 1);
  if (toString$.call(f).slice(8, -1) !== 'Function') {
    f = objToFunc(f);
  }
  if (!xss[0].length || !xss[1].length) {
    return [];
  } else {
    for (i$ = 0, len$ = (ref$ = zipAll.apply(this, xss)).length; i$ < len$; ++i$) {
      xs = ref$[i$];
      results$.push(f.apply(this, xs));
    }
    return results$;
  }
};
out$.compose = compose = function(){
  var funcs;
  funcs = slice$.call(arguments);
  return function(){
    var args, i$, ref$, len$, f;
    args = arguments;
    for (i$ = 0, len$ = (ref$ = funcs).length; i$ < len$; ++i$) {
      f = ref$[i$];
      args = [f.apply(this, args)];
    }
    return args[0];
  };
};
out$.curry = curry = function(f){
  return curry$(f);
};
out$.id = id = function(x){
  return x;
};
out$.flip = flip = curry$(function(f, x, y){
  return f(y, x);
});
out$.fix = fix = function(f){
  return function(g, x){
    return function(){
      return f(g(g)).apply(null, arguments);
    };
  }(function(g, x){
    return function(){
      return f(g(g)).apply(null, arguments);
    };
  });
};
out$.lines = lines = function(str){
  if (!str.length) {
    return [];
  }
  return split$.call(str, '\n');
};
out$.unlines = unlines = function(strs){
  return join$.call(strs, '\n');
};
out$.words = words = function(str){
  if (!str.length) {
    return [];
  }
  return split$.call(str, /[ ]+/);
};
out$.unwords = unwords = function(strs){
  return join$.call(strs, ' ');
};
out$.max = max = curry$(function(x$, y$){
  return x$ > y$ ? x$ : y$;
});
out$.min = min = curry$(function(x$, y$){
  return x$ < y$ ? x$ : y$;
});
out$.negate = negate = function(x){
  return -x;
};
out$.abs = abs = Math.abs;
out$.signum = signum = function(x){
  switch (false) {
  case !(x < 0):
    return -1;
  case !(x > 0):
    return 1;
  default:
    return 0;
  }
};
out$.quot = quot = curry$(function(x, y){
  return ~~(x / y);
});
out$.rem = rem = curry$(function(x$, y$){
  return x$ % y$;
});
out$.div = div = curry$(function(x, y){
  return Math.floor(x / y);
});
out$.mod = mod = curry$(function(x$, y$){
  var ref$;
  return ((x$) % (ref$ = y$) + ref$) % ref$;
});
out$.recip = recip = (function(it){
  return 1 / it;
});
out$.pi = pi = Math.PI;
out$.tau = tau = pi * 2;
out$.exp = exp = Math.exp;
out$.sqrt = sqrt = Math.sqrt;
out$.ln = ln = Math.log;
out$.pow = pow = curry$(function(x$, y$){
  return Math.pow(x$, y$);
});
out$.sin = sin = Math.sin;
out$.tan = tan = Math.tan;
out$.cos = cos = Math.cos;
out$.asin = asin = Math.asin;
out$.acos = acos = Math.acos;
out$.atan = atan = Math.atan;
out$.atan2 = atan2 = curry$(function(x, y){
  return Math.atan2(x, y);
});
out$.truncate = truncate = function(x){
  return ~~x;
};
out$.round = round = Math.round;
out$.ceiling = ceiling = Math.ceil;
out$.floor = floor = Math.floor;
out$.isItNaN = isItNaN = function(x){
  return x !== x;
};
out$.even = even = function(x){
  return x % 2 === 0;
};
out$.odd = odd = function(x){
  return x % 2 !== 0;
};
out$.gcd = gcd = curry$(function(x, y){
  var z;
  x = Math.abs(x);
  y = Math.abs(y);
  while (y !== 0) {
    z = x % y;
    x = y;
    y = z;
  }
  return x;
});
out$.lcm = lcm = curry$(function(x, y){
  return Math.abs(Math.floor(x / gcd(x, y) * y));
});
out$.installPrelude = installPrelude = function(target){
  var ref$;
  if (!((ref$ = target.prelude) != null && ref$.isInstalled)) {
    import$(target, out$);
    import$(target, target.prelude.isInstalled = true);
  }
};
out$.prelude = prelude = out$;
function curry$(f, args){
  return f.length > 1 ? function(){
    var params = args ? args.concat() : [];
    return params.push.apply(params, arguments) < f.length && arguments.length ?
      curry$.call(this, f, params) : f.apply(this, params);
  } : f;
}
function in$(x, arr){
  var i = 0, l = arr.length >>> 0;
  while (i < l) if (x === arr[i++]) return true;
  return false;
}
function compose$(fs){
  return function(){
    var i, args = arguments;
    for (i = fs.length; i > 0; --i) { args = [fs[i-1].apply(this, args)]; }
    return args[0];
  };
}
function not$(x){ return !x; }
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}
  return exports;
}();