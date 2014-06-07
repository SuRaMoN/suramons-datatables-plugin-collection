
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
		if(undefined === options.constantRowHeight) {
			originalDataTable.apply(this, arguments);
		}

		options.columnDefs = undefined === options.columnDefs ? [] : options.columnDefs;
		options.columnDefs.push({
			"targets": "_all",
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).wrapInner("<div>").children().css({
					"overflow": "hidden",
					"height": options.constantRowHeight
				})
			}
		});
		originalDataTable.apply(this, arguments);
	}
})();
 
