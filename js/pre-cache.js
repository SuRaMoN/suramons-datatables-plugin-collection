
(function() {
	if(typeof jQuery === 'undefined') {
		return console.error("Error while trying to initialize datatables constant-row-height plugin: jQuery");
	}
	var $ = jQuery;
	if(undefined === $.fn.dataTable) {
		return console.error("Error while trying to initialize datatables constant-row-height plugin: dataTables not yet loaded");
	}

	var originalDataTable = $.fn.dataTable;
	$.fn.dataTable = function(options) {
		if(undefined === options.preCache || ! options.preCache) {
			originalDataTable.apply(this, arguments);
		}

		var cache = {};
		var bufferedPageCount = 7;

		function queryToCacheKey(data) {
			var drawLessData = $.extend({}, data);
			drawLessData.draw = 0;
			return JSON.stringify(drawLessData);
		}

		function isCachedOrInProgress(request) {
			return undefined !== cache[queryToCacheKey(request)];
		}

		function extendRequestToMorePages(request) {
			request.start -= request.length *
		}

		function retrieveAndCacheData(request, callback) {
			var newRequest = extendRequestToMorePages(request);
			$.ajax({
				"data": request,
				"success": function(json) {
					cache[queryToCacheKey(request)] = json;
					callback(json);
				},
				"dataType": "json",
				"cache": false,
				"type": "GET",
				"error": function (xhr, error, thrown) {
					alert("Error while receive ajax: " + error);
				},
				"url": options.ajax
			});
		}


		options.ajax = function (request, callback, oSettings) {
			var key = queryToCacheKey(request);
			if(cache[key] !== undefined) {
				var dataWithDraw = $.extend({}, cache[key]);
				dataWithDraw.draw = request.draw;
				callback(dataWithDraw);
			} else {
				retrieveAndCacheData(request, callback);
			}
		}
		originalDataTable.apply(this, arguments);
	}
})();
 
