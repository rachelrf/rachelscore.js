
rs = require("./rachelscore");

var assertEquals = function(actual, expected) {
	if (JSON.stringify(actual) !== JSON.stringify(expected)) {
		throw new Error("Expected " + JSON.stringify(actual, null, '\t') + " to equal " + JSON.stringify(expected, null, '\t'));
	}
}

// Test each
//------------
var input = [1, 2, 3, 4];
var output = [];
rs.each(input, function(item) {output.push(item*2);});
assertEquals(output, [2, 4, 6, 8]);
//------------

// Test eachSome
//------------
var input = [1, 2, 3, 4];
var output = [];
rs.eachSome(input, function(item) {output.push(item*2);});
assertEquals(output, [2, 4, 6]);
//------------

// Test filter
//------------
var input = [1, 2, 3, 4, 5, 6];
var output = rs.filter(input, function(num){return num % 2 == 0;});
assertEquals(output, [2, 4, 6]);
//------------

// Test map
//------------
var input = [1, 2, 3, 4];
var output = rs.map(input, function(item) {return item * 2;});
assertEquals(output, [2, 4, 6, 8]);
//------------

// Test reduceRight
//------------
var input = [[1],[2],[3]];
var output = rs.reduceRight(input, function(a,b) {return a.concat(b); }, []);
assertEquals(output, [3, 2, 1]);
//------------

// Test findIndex
//------------
var input = [1,3,9];
var output = rs.findIndex(input, function(a) {return a % 2 === 0});
assertEquals(output, -1);
//------------

// Test find
//------------
var input = [1,3,9];
var output = rs.find(input, function(a) {return a % 3 === 0});
assertEquals(output, 3);
//------------

// Test where
//------------
var input = [{firstName:"Rachel", lastName:"Rose", age:24}, {firstName:"Rachael", lastName:"Flatt", age:22}, {firstName:"Rachel", lastName:"Bilson", age:33}];
var output = rs.where(input, {firstName:"Rachel"});
assertEquals(output, [{firstName:"Rachel", lastName:"Rose", age:24}, {firstName:"Rachel", lastName:"Bilson", age:33}]);
//------------

// Test keys
//------------
var input = {firstName:"Rachel", lastName:"Rose", age:24};
var output = rs.keys(input);
assertEquals(output, ["firstName", "lastName", "age"]);
//------------

// Test findWhere
//------------
var input = [{firstName:"Rachel", lastName:"Rose", age:24}, {firstName:"Rachael", lastName:"Flatt", age:22}, {firstName:"Rachel", lastName:"Bilson", age:33}];
var output = rs.findWhere(input, {firstName:"Rachel", age:24});
assertEquals(output, {firstName:"Rachel", lastName: "Rose", age:24});
//------------

// Test reject
//------------
var input = [1,2,3,4];
var output = rs.reject(input, function(a) {return a % 2 === 0});
assertEquals(output, [1,3]);
//------------

// Test every
//------------
var input = [1,2,3,4];
var output = rs.every(input, function(a) {return a % 2 === 0});
assertEquals(output, false);
//------------

// Test some
//------------
var input = [1,2,3,4];
var output = rs.some(input, function(a) {return a % 2 === 0});
assertEquals(output, true);
//------------

// Test contains
//------------
var arr = [1,2,3,4];
var value = 9;
var output = rs.contains(arr,value);
assertEquals(output, false);
//------------

// Test pluck
//------------
var input = [{firstName:"Rachel", lastName:"Rose", age:24}, {firstName:"Rachael", lastName:"Flatt", age:22}, {firstName:"Rachel", lastName:"Bilson", age:33}];
var output = rs.pluck(input, "firstName");
assertEquals(output, ["Rachel", "Rachael", "Rachel"]);
//------------

// Test max
//------------
var input = [{firstName:"Rachel", lastName:"Rose", age:24}, {firstName:"Rachael", lastName:"Flatt", age:22}, {firstName:"Rachel", lastName:"Bilson", age:33}];
var output = rs.max(input, function(input){ return input.age; });
assertEquals(output, {firstName:"Rachel", lastName:"Bilson", age:33});
//------------

// Test min
//------------
var input = [{firstName:"Rachel", lastName:"Rose", age:24}, {firstName:"Rachael", lastName:"Flatt", age:22}, {firstName:"Rachel", lastName:"Bilson", age:33}];
var output = rs.min(input, function(input){ return input.age; });
assertEquals(output, {firstName:"Rachael", lastName:"Flatt", age:22});
//------------

// Test sortBy
//------------
var input = [{firstName:"Rachel", lastName:"Rose", age:24}, {firstName:"Rachael", lastName:"Flatt", age:22}, {firstName:"Rachel", lastName:"Bilson", age:33}];
var output = rs.sortBy(input, 'age');
assertEquals(output, [{firstName:"Rachael", lastName:"Flatt", age:22}, {firstName:"Rachel", lastName:"Rose", age:24}, {firstName:"Rachel", lastName:"Bilson", age:33}]);
var output = rs.sortBy(input, 'lastName');
assertEquals(output, [{firstName:"Rachel", lastName:"Bilson", age:33}, {firstName:"Rachael", lastName:"Flatt", age:22}, {firstName:"Rachel", lastName:"Rose", age:24}]);
var output = rs.sortBy(input, function(item) {return item.age%5});
assertEquals(output, [{firstName:"Rachael", lastName:"Flatt", age:22}, {firstName:"Rachel", lastName:"Bilson", age:33}, {firstName:"Rachel", lastName:"Rose", age:24}]);
//------------

// Test groupBy
//------------
var input = [1.3, 2.1, 2.3];
var fun = function(num){ return Math.floor(num); }
var output = rs.groupBy(input, fun);
assertEquals(output,  {1: [1.3], 2: [2.1, 2.3]});
var input = ['one', 'two', 'three'];
var output = rs.groupBy(input, 'length');
assertEquals(output,  {3: ['one', 'two'], 5: ['three']});

//------------

// Test uniq
//------------
var input = [1,1,2,3,4,4,5];
var output = rs.uniq(input);
assertEquals(output,[1,2,3,4,5]);

//------------

// Test indexBy
//------------
var input = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
var index = 'age';
var output = rs.indexBy(input, index);
assertEquals(output, {"40": {name: 'moe', age: 40},"50": {name: 'larry', age: 50},"60": {name: 'curly', age: 60}});

//------------

// Test countBy
//------------
var input = [1,2,3,4,5];
var fun = function(num) {return num % 2 == 0 ? 'even': 'odd';};
var output = rs.countBy(input, fun);
assertEquals(output, {odd: 3, even: 2});

//------------

// Test shuffle
//------------
var input = [1,2,3,4,5];
var output = rs.shuffle(input);
// assertEquals(output, [4,2,5,3,1]);
// input shuffles randomly, test will probably not pass

//------------


// Test values
//------------
var input = {one: 1, two: 2, three: 3};
var output = rs.values(input);
assertEquals(output, [1,2,3]);

//------------

// Test size
//------------
var input = {one: 1, two: 2, three: 3};
var output = rs.size(input);
assertEquals(output, 3);

//------------

// Test partition
//------------
var input = [0, 1, 2, 3, 4, 5];
var fun = function(num) {return num % 2 === 0;};
var output = rs.partition(input, fun);
assertEquals(output,  [[0, 2, 4],[1, 3, 5]]);

//------------

// Test first
//------------
var input = [0, 1, 2, 3, 4, 5];
var output = rs.first(input);
assertEquals(output,  [0]);

//------------

// Test initial
//------------
var input = [0, 1, 2, 3, 4, 5];
var output = rs.initial(input);
assertEquals(output,  [0, 1, 2, 3, 4]);

//------------

// Test last
//------------
var input = [0, 1, 2, 3, 4, 5];
var output = rs.last(input, 3);
assertEquals(output,  [3, 4, 5]);

//------------

// Test rest
//------------
var input = [0, 1, 2, 3, 4, 5];
var output = rs.rest(input);
assertEquals(output,  [1, 2, 3, 4, 5]);

//------------

// Test setUndef
//------------
var input;
var output = rs.setUndef(input, 0);
assertEquals(output, 0);

//------------

// Test compact
//------------
var input = [0, 1, false, 2, '', 3];
var output = rs.compact(input);
assertEquals(output,  [1, 2, 3]);

//------------

// Test without
//------------
var input = [0, 1, 2, 3, 3, 7];
var values = [0, 1, 3]
var output = rs.without(input, values);
assertEquals(output,  [2, 7]);

//------------

// Test difference
//------------
var input = [1, 2, 3, 4, 5];
var values = [5, 2, 10];
var output = rs.difference(input, values);
assertEquals(output,  [1, 3, 4]);

//------------

// Test sort
//------------
var input = [1, 5, 10, 2, 6];
var values =  true;
var output = rs.sort(input, true);
assertEquals(output,  [1, 2, 5, 6, 10]);

//------------

// Test capitalize
//------------
var input = "FOO Bar";
var value =  true;
var output = rs.capitalize(input, value);
assertEquals(output, "Foo bar");

//------------

// Test chop
//------------
var input = "whitespace";
var value =  3;
var output = rs.chop(input, value);
assertEquals(output, ["whi", "tes", "pac", "e"]);

//------------

// Test clean
//------------
var input =  " foo   bar ";
var output = rs.clean(input);
assertEquals(output, "foo bar");

//------------

// Test chars
//------------
var input =  "Hello";
var output = rs.chars(input);
assertEquals(output, ["H", "e", "l", "l", "o"]);

//------------

// Test includes
//------------
var input =  "Hello";
var sub = "Hell";
var output = rs.includes(input, sub);
assertEquals(output, true);

//------------

// Test insert
//------------
var input =  "Hello";
var pos = 4;
var sub = "world";
var output = rs.insert(input, pos, sub);
assertEquals(output, "Hellworldo");

//------------

// Test replaceAll
//------------
var input =  "foo";
var output = rs.replaceAll(input, 'o','a');
assertEquals(output, "faa");

//------------

// Test join
//------------
var separator =  " ";
var str1 = "foo";
var str2 = "bar";
var output = rs.join(separator, str1, str2);
assertEquals(output, "foo bar");

//------------

// Test splice
//------------
var input =  "hello";
var str = "foo";
var pos = 5;
var len = 0;
var output = rs.splice(input, pos, len, str);
assertEquals(output, "hellofoo");

//------------

// Test titleize
//------------
var input =  "my name is epeli";
var output = rs.titleize(input);
assertEquals(output, "My Name Is Epeli");

//------------

// Test camelize
//------------
var input =  "-the-Moz_transform";
var output = rs.camelize(input);
assertEquals(output, "TheMozTransform");

//------------

// Test prune
//------------
var input =  "Hello, world";
var output = rs.prune(input, 9);
assertEquals(output, "Hello");

//------------

// Test repeat
//------------
var input =  "foo";
var separator = "bar";
var output = rs.repeat(input, 3, separator);
assertEquals(output, "foobarfoobarfoo");

//------------

// Test toSentence
//------------
var input =  ["Ruby", "Python", "CoffeeScript"];
var output = rs.toSentence(input);
assertEquals(output, "Ruby, Python and CoffeeScript");

//------------

//Test zip
//------------
var input =  [["roses", "violets", "sugar"], ["red", "purple", "sweet"], [true, false, true]];
var output = rs.zip(input);
assertEquals(output, [["roses", "red", true],["violets", "purple", false],["sugar", "sweet", true]]);

//------------

//Test range
//------------
var input =  5;
var start = 2;
var step = 1.5;
var output = rs.range(input, start, step);
assertEquals(output, [2, 3.5, 5, 6.5, 8]);

//------------

//Test union
//------------
var arr1 = [1, 2, 3]; 
var arr2 = [101, 2, 1, 10];
var output = rs.union(arr1, arr2);
assertEquals(output, [1, 2, 3, 101, 10]);

//------------

//Test intersection
//------------
var arr1 = [1, 2, 3]; 
var arr2 = [101, 2, 1, 10];
var output = rs.intersection(arr1, arr2);
assertEquals(output, [1, 2]);

//------------

//Test flatten
//------------
var arr = [[1], [2], [3]]; 
var shallow = false;
var output = rs.flatten(arr, shallow);
assertEquals(output, [1, 2, 3]);

//------------

//Test reversed
//------------
var input = "Hello"; 
var output = rs.reverse(input);
assertEquals(output, "olleH");

//------------

//Test numFormat
//------------
var input = 4777111888.35749; 
var decimals = 2;
var output = rs.numFormat(input, decimals);
assertEquals(output, '4,777,111,888.36');

//------------

//Test toNumber
//------------
var input = '478.3524361'; 
var decimals = 2;
var output = rs.toNumber(input, decimals);
assertEquals(output, 478.35);

//------------
