
var rs = rachelscore = {};

// EACH:Takes an array and a function as parameters

var each = function(arr, fun) {
	for (var i = 0; i < arr.length; i++){
		fun(arr[i], i);
	}
	return arr;
}

rs.each = each;

// EACHSOME: Similar to each, only acts on the first n items of an array, 
// defaults to n=1

var eachSome = function(arr, fun, n) {
	n = setUndef(n, 1);

	for (var i = 0; i < arr.length-n; i++){
		fun(arr[i], i);
	}
	return arr;
}

rs.eachSome = eachSome;

// FILTER: takes an array and a condition and returns an array 
// of all instances of the original array that meet the condition

var filter = function(arr, fun) {
	var newArr = [];

	var filterItem = function(item) {
		if (fun(item) === true) {
			newArr.push(item);
		}
	}
	each(arr, filterItem);
	return newArr;
}

rs.filter = filter;

//MAP: passes each value of an array through a function and returns
//the new array

var map = function(arr, fun) {
	var newArr = [];

	each(arr, function(item) {
			newArr.push(fun(item));
		});
	return newArr;
}
rs.map = map;

//REDUCE: boils down a list of elements (using memo as the starting point) 
//by applying a function sequentially

var reduce = function(arr, fun, memo) {
	if( arr.length === 0 ) {
        return memo;
    }else{
    	return reduce( arr.slice(1), fun, fun(memo, arr[0]));
	}
}

rs.reduce = reduce;

//REDUCERIGHT: boils down a list of elements (using memo as the starting point) 
//by applying a function sequentially

var reduceRight = function(arr, fun, memo) {
	if( arr.length === 0 ) {
        return memo;
    }else{
    	return reduceRight( first(arr,arr.length-1), fun, fun(memo, arr[arr.length-1]));
	}
}

rs.reduceRight = reduceRight;

//FIND: returns the first instance in an array that returns tru to the function

var find = function(arr, fun) {
	return arr[findIndex(arr,fun)];
}

rs.find = find;

//FINDINDEX: returns the first index where the predicate truth test passes

var findIndex = function(arr, fun) {
  for (var i = 0; i < arr.length; i++) {
    if (fun(arr[i]) === true) {
      return i;
    }
  }
  return -1; 
}

rs.findIndex = findIndex;

//WHERE: takes a key value and an array of objects and returns an array containing the 
//objects that include that key value

var where = function(arr, keyVals) {
	function fun(item) {
		for (key in keyVals){
			if (keyVals[key] !== item[key]){
				return false;
			}
		}
		return true;
	}
  	return filter(arr, fun);
}

rs.where = where;

//FINDWHERE: takes a key value and an array of objects and returns the first objects
// that include that key value

var findWhere = function(arr, keyVals) {
	function fun(item) {
		for (key in keyVals){
			if (keyVals[key] !== item[key]){
				return false;
			}
		}
		return true;
	}
  	return find(arr, fun);
}

rs.findWhere = findWhere;

//KEYS: returns array of all keys in object

var keys = function(obj) {
   var keys = [];
   for(key in obj) {
      keys.push(key);
   }
   return keys;
}

rs.keys = keys;

//REJECT: eturns the values in list without the elements that the truth test 
//(predicate) passes. The opposite of filter.

var reject = function(arr, fun) {
	var newArr = [];

	var rejectItem = function(item) {
		if (fun(item) !== true) {
			newArr.push(item);
		}
	}
	each(arr, rejectItem);
	return newArr;
}

rs.reject = reject;

//EVERY: Returns true if all of the values in the list pass the predicate truth test.

var every = function(arr, fun) {
	if (filter(arr,fun) === arr){
		return true;
	}
	return false;
}

rs.every = every;

//SOME: Returns true if any of the values in the list pass the predicate truth test.

var some = function(arr, fun) {
	if (filter(arr,fun).length > 0) {
		return true;
	}
	return false;
}

rs.some = some;

//CONTAINS: Returns true if the value is present in the list.

var contains = function(arr, value, fromIndex) {
	if (fromIndex !== undefined) {
		arrTest = arr.splice(fromIndex, arr.length);
	}else{
		arrTest = arr;
	}

	if(arrTest.indexOf(value) !== -1){
		return true;
	}
	return false;
}

rs.contains = contains;

// PLUCK: extracts a list of properties from an array of objects

var pluck = function(arr, key) {
	var keyFun = function(item){
		return item[key];
	}

	return map(arr,keyFun);
}

rs.pluck = pluck;

//INDEXMAX: returns the index of the maximum value in an array

var indexMax = function(arr) {	
  var max = arr[0];
  var index = 0;
  for (var i = 0; i < arr.length-1; i++) {
    if (arr[i+1] > arr[i]) {
      max = arr[i+1];
      index = i+1;
    }
  }
  return index;
}

rs.indexMax = indexMax

//INDEXMIN: returns the index of the minimum value in an array

var indexMin = function(arr) {	
  var max = arr[0];
  var index = 0;
  for (var i = 0; i < arr.length-1; i++) {
    if (arr[i+1] < arr[i]) {
      max = arr[i+1];
      index = i+1;
    }
  }
  return index;
}

rs.indexMin = indexMin

//MAX: returns the maximum value

var max = function(arr, fun) {
	maxs = map(arr, fun);
	return arr[indexMax(maxs)];
}

rs.max = max

//MIN: returns the minimum value

var min = function(arr, fun) {
	mins = map(arr, fun);
	return arr[indexMin(mins)];
}

rs.min = min

//SORTBY: returns an array which is transformed by a passed in function and sorted

var sortBy = function(arr, fun) {
	if (typeof fun === "string") {
		var keyName = fun;
		fun = function(item) {
			return item[keyName];
		}
	}

	var objSort = map(arr, function(item){
		return {
			original: item,
			toSort: fun(item)
		};
	}).sort(function(a,b){
		if (a.toSort > b.toSort) {
			return 1;
		} else if (a.sort < b.sort) {
			return -1;
		}
		return 0;
	});
	return pluck(objSort, "original");
}

rs.sortBy = sortBy

//GROUPBY: returns an object containing the input slit into sets

var groupBy = function(arr, fun) {
	if (typeof fun === "string") {
		var keyName = fun;
		fun = function(item) {
			return item[keyName];
		}
	}

	var objSort = map(arr, function(item){
		return {
			original: item,
			result: fun(item)
		};
	})
	
	var keys = pluck(objSort, "result");
	var newKeys = each(keys, function(item){
		return item.toString();
	})

	var newObj = {};

	var toObj = function(item) {
			newObj[item] = [];
	};
	
	each(newKeys, toObj);
	each(objSort, function(item){
		var funKey = item['result'];
		newObj[funKey].push(item['original']);
	});
	return newObj;
}

rs.groupBy = groupBy

//UNIQ: returns an array containing only unique values of the original array without replicates

var uniq = function(arr) {
	var uniqueArr = arr.filter(function(item, pos, arr) {
    	return arr.indexOf(item) == pos;
  	}); 
	return uniqueArr;
}

rs.uniq = uniq

//INDEXBY: indexes an object based on a detemined property

var indexBy = function(arr, index) {
	var newObj = {};

	each(arr, function(item){
 		var key = item[index];
 		newObj[key] = item;
	});
	return newObj;
}

rs.indexBy = indexBy

//COUNTBY: Similar to groupBy, but instead of returning a list of 
//values, returns a count for the number of values in that group.

var countBy = function(arr, fun) {
	var groupedObj = groupBy(arr, fun);
	var keys = Object.keys(groupedObj);
	var countObj = {};

	each(keys, function(item){
		var key = item;
		var count = groupedObj[key].length;
		countObj[key] = count;
	});
	return countObj;
}

rs.countBy = countBy

//SHUFFLE: shuffles an array based on the Fisher-Yates shuffle

var shuffle = function(arr){
	var len = arr.length;

  	while (len>0) {
		i = Math.floor(Math.random() * len--);
		hold = arr[i];
    	arr[i] = arr[len];
    	arr[len] = hold;
 	}
  return arr;
}

rs.shuffle = shuffle

//SAMPLE: returns a random sample or set from the list.

var sample = function(arr, n) {
	var shuffleArr = shuffle(arr);

	if (typeof n === 'number'){
		return shuffleArr.first(n);
	}else{
		return shuffleArr[0];
	}
}

rs.sample = sample

//VALUES: return all of the values of the object's properties.

var values = function(obj) {
    var keyArr = keys(obj);
    var length = keyArr.length;
    var values = Array(length);

    for (var i = 0; i < length; i++) {
      values[i] = obj[keyArr[i]];
    }
    return values;
  };

rs.values = values

//SIZE: returns the size of a string, array, or object. Returns undefined for other types of input. 

var size = function(input) {
    if (typeof input === 'object'){
    	return keys(input).length;
    }else if (typeof input === String || Array){
    	return input.length;
    }
}

rs.size = size

//PARTITION: splits an array into two arrays: one whose elements 
//all satisfy predicate and one whose elements all do not satisfy predicate

var partition = function(arr, fun){
	var pass = [];
	var fail = [];
	var passFail = function(num){
		if (fun(num) == true) {
      	pass.push(num);
      }else{
      	fail.push(num);
      }
  	};

    each(arr, passFail);
    return [pass, fail];
}

rs.partition = partition;

//SETUNDEF: checks if a value is undefined and returns a set value if it is

var setUndef = function(n, set){
	if (typeof n != 'number'){
		return n = set;
		}
	return n;
}

rs.setUndef = setUndef

//FIRST: returns the first n elements of an array.

var first = function(arr, n){
	n = setUndef(n, 1);
	return arr.slice(0,n);
}

rs.first = first;

//INITIAL: returns everything but the last n elements of an array.

var initial = function(arr, n){
	n = setUndef(n, 1);
	return first(arr, arr.length-n);
}

rs.initial = initial;

//LAST: returns the last n elements of an array.

var last = function(arr, n){
	n = setUndef(n, 1);
	return arr.slice(arr.length - n, arr.length);
}

rs.last = last;

//REST returns the remaining n elements of an array.

var rest = function(arr, n){
	n = setUndef(n, 0);
	return arr.slice(n+1);
}

rs.rest = rest;

//COMPACT: returns a copy of the array with all falsy values removed.

var compact = function(arr) {
    return filter(arr, function(item){
    	if (item == false){
    	}else{return true}
    });
}

rs.compact = compact;

//WITHOUT: rturns a copy of the array with all instances of the values removed.

var without = function(arr, values) {
    return filter(arr, function(item){	
    	if (values.indexOf(item) === -1){
 			return true;
    	}	
    });
}

rs.without = without;

//DIFFERENCE: similar to without, but returns the values from array that are not 
//present in the other arrays.

var difference = function(arr, values) {
    return filter(arr, function(item){ 	
    	if (values.indexOf(item) === -1){
 			return true;
    	}	
    });
}

rs.difference = difference;

//FLATTEN: flattens a nested array 

var flatten = function(arr, shallow) {
	shallow = setUndef(shallow, true);
	if (shallow !== true) {
    	return arr.reduce(function (flat, toFlatten) {
    		return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  		}, []);
	}else{
		arr = arr.reduce(function(a, b){
     		return a.concat(b);
		});
		return arr;
	}		
}
	
rs.flatten = flatten;

//UNION: returns the union of two arrays

var union = function(arr1, arr2){
	return uniq(arr1.concat(arr2));
}

rs.union = union

//INTERSECTION: returns the intersection of two arrays

var intersection = function(arr1, arr2){
	var inter = [];
	each(arr1, function(item){
		if (arr2.indexOf(item) !== -1){
			inter.push(item);
		}
	});
	return uniq(inter);
}

rs.intersection = intersection

//SORT: sorts arrays either ascending or descending

var sort = function(arr, ascending){
	if (ascending === true || undefined){
		arr.sort(function(a,b){return(a-b)});
	}else{
		arr.sort(function(a,b){return(b-a)})
	}
	return arr;
}

rs.sort = sort

//CAPITALIZE: converts first letter of the string to uppercase. If true is passed 
//as second argument the rest of the string will be converted to lower case.

var capitalize = function(str, lcase){
	var strNew = str[0].toUpperCase();
	if (lcase === true){
		strNew += str.slice(1).toLowerCase();
	}else{
		strNew += str.slice(1);
	}
	return strNew;
}

rs.capitalize = capitalize

//CHOP: splits the string into specified length

var chop = function(str, step){
	var chopped = [];
	var counter = 0;

	for(var i = 0; i < str.length - step + 1; i+=step){
		chopped.push(str.slice(i, i+step));
		counter++;
	}
	chopped.push(str.slice(counter*step));
	return chopped;
}

rs.chop = chop

//CLEAN: removes extraneous whitespace

var clean = function(str){
	str = str.replace(/\s+/g," ");

	if (str[0] === " "){
		str = rest(str);
	}
	if (last(str) === " "){
		str = initial(str);
	}
	return str;	
}

rs.clean = clean

//CHARS: splits string into characters

var chars = function(str){
	return str.split('');
}

rs.chars = chars

//INCLUDES: determines if a string contains another string, returns Boolean

var includes = function(str, sub){
	if (str.indexOf(sub) !== -1){
		return true;
	}else{
		return false;
	}
}

rs.includes = includes

//INSERT: inserts a string into another string at a specified position

var insert = function(str1, pos, str2){
	return str1.slice(0,pos) + str2 + str1.slice(pos);
}

rs.insert = insert

//REPLACEALL: replaces all occurances of a string with another string

var replaceAll = function(str1, rep, newStr){
	var re = new RegExp(rep,"g");
	var strNew = str1.replace(re, newStr);
	return strNew;
}

rs.replaceAll = replaceAll

//JOIN: joins string together with a given separator

var join = function(separator, str1, str2){
	var strNew = str1+separator+str2;
	return strNew;
}

rs.join = join

//SPLICE: like slice with an extra p

var splice = function(str1, pos, len, str2){
	var strNew = str1.slice(0,pos)+str2+str1.slice(pos+len);
	return strNew;
}

rs.splice = splice

//TITLEIZE: capitalizes the first letter of each word in a string

var titleize = function(str){
	return str.split(' ').map(function(item){
		return item[0].toUpperCase() + item.slice(1).toLowerCase();
	}).join(' ');
}

rs.titleize = titleize

//CAMELIZE: removes dashes and underscores, and camelizes punctuation

var camelize = function(str){
	var arr = str.split('-');
	var newArr = [];
	newArr = flatten(map(arr,function(item){return item.split('_')}));
	
	var firstWord = true;
	var newStr = "";
	each(newArr, function(item){
		if (firstWord === true){
			newStr = item.toLowerCase();
			firstWord = false;
		}else{
			newStr += item[0].toUpperCase() + item.slice(1).toLowerCase();
		}
	})

	if (str[0] === '-' || '_'){
		newStr = newStr[0].toUpperCase() + newStr.slice(1)
	}
	return newStr;
}

rs.camelize = camelize

//PRUNE: Elegant version of truncate. Makes sure the pruned string does not exceed the original length.
// Avoid half-chopped words when truncating.

var prune = function(str, len){
	var abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var strArr = str.split(' '); 
	var newStr = "";
	each(strArr, function(item){
		if (newStr.length + item.length <= len){
			newStr += item;
		}
	})

	if (abc.indexOf(last(newStr)) === -1){
		newStr = initial(newStr);
	}
	return newStr;
}

rs.prune = prune

//REPEAT: repeats a string a set number of times with separator option.

var repeat = function(str, reps, separator){
	if (separator === undefined){
		separator = "";
	}

	var newStr = "";
	for(var i = 0; i < reps-1; i++){
		newStr += str + separator;
	}
	return newStr + str;
}

rs.repeat = repeat

//TOSENTENCE: Gives a list sentence-style punctuation. No Oxford comma. 

var toSentence = function(arr){
	var newStr = "";

	if (arr.length <= 2){
		newStr = arr.join(" and ");
	}else{
		eachSome(arr, function(item){
			newStr += item + ", ";
		});
		newStr = initial(newStr,2);
		newStr += " and " + last(arr);
	}
	return newStr;
}

rs.toSentence = toSentence

//ZIP: merges together the values of each of the arrays with the values at the corresponding position.

var zip = function(arr) {
	var zipped = [];
	 for (var i = 0; i < arr.length; i++) {
      zipped[i] = pluck(arr, i);
    }
    return zipped;
}

rs.zip = zip

//UNZIP: same as zip, for user clarity.

var unzip = function(arr) {
    return zip(arr);
}

rs.unzip = unzip

//RANGE: creates an array of integers according to the specifications

var range = function(num, start, step){
	start = setUndef(start, 0);
	step = setUndef(step, 1);

	var arr = [];

	for (var i = start; i < start + num*step; i+=step){
		arr.push(i);
	}
	return arr;
}

rs.range = range

//REVERSE: reverses a string

var reverse = function(str){
 	var reversed = "";
  	for (var i = str.length-1; i >= 0; i--) {
    reversed += str.slice(i, i+1);
  } 
  return reversed; 
}

rs.reverse = reverse

//NUMFORMAT: returns a number in string format with commas and determined decimal places

var numFormat = function(num, dec){
 	var numStr = num.toFixed(dec);
 	result = "";
 	var start = numStr.indexOf(".")-3;
 	for (var i = start; i > 0; i-=3){
 		result = numStr.slice(0, i) + "," + numStr.slice(i);
 		numStr = result;
 	}
  return numStr; 
}

rs.numFormat = numFormat

//TONUMBER: parses string to number

var toNumber = function(numStr, dec){
 	var fixedDecStr = parseFloat(numStr).toFixed(dec);
 	return parseFloat(fixedDecStr);
}

rs.toNumber = toNumber


module.exports = rs;
