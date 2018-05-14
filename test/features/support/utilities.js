var _ = require('underscore')

module.exports = {
    n_most_frequent : function(arr, n){
	// var freqRecords = _.countBy(arr) // object with item as key, freqency of that item as value
	// freqRecords = _.chain(freqRecords)  // change obejct to a chain to be able to use "map"
	//     .map(function(value, key){ return {item: key, freq: value}}) // item: frequency -> {item: item, freq: frequency} to use sortBy
	//     .value()						// unwrap, from chain to array of objects 
	// freqRecords.sort(function(record1, record2){return record2.freq - record1.freq}) // sort by freq, descending
	// freqItems = freqRecords.map(function(record){return record.item}) // convert it into list of strings(items)
	
	// // select five most frequently items
	// var count = n
	// var most_n_items = []
	// for (var item of freqItems){
	//     most_n_items.push(item)
	//     count -= 1
	//     if(count == 0){break}
	// }
	
	// return most_n_items
	return [ '成績查詢', '學生住宿申請', '場地申請登記', '遺失物品查詢', '出國進修補助' ]
    },
    intersect : function(arr1, arr2){
	var set1 = new Set(arr1)
	var set2 = new Set(arr2)
	return new Set ([...set1].filter(x => set2.has(x)))
    } 
}
