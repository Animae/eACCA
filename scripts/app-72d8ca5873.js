"use strict";angular.module("site",["ui.router","ui.bootstrap","ngConfirm"]).config(["$stateProvider","$urlRouterProvider",function(e,t){e.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainCtrl"}).state("demo1",{url:"/demo1",templateUrl:"app/demo1/demo.html",controller:"Demo1Ctrl"}).state("demo2",{url:"/demo2",templateUrl:"app/demo2/demo.html",controller:"Demo2Ctrl"}),t.otherwise("/")}]),angular.module("site").controller("MainCtrl",["$scope",function(e){e.awesomeThings=[]}]),angular.module("site").controller("Demo2Ctrl",["$scope","$filter","$timeout",function(e,t,o){function n(){for(var e=[],t="0123456789abcdef",o=0;36>o;o++)e[o]=t.substr(Math.floor(16*Math.random()),1);e[14]="4",e[19]=t.substr(3&e[19]|8,1),e[8]=e[13]=e[18]=e[23]="-";var n=e.join("");return n}e.itemsTabActive=!0,e.keyDown=function(t,n){if(t.altKey&&65===t.keyCode){t.preventDefault(),e.addItem();var a="body > div.ng-scope > div > div.ng-isolate-scope > div > div.tab-pane.ng-scope.active > div:nth-child("+(n+1)+") > div.col-md-2 > div > input";o(function(){$(a).focus()},500)}},e.format="EEE dd-MMM-yyyy",e.datePickerOpenedItems={},e.lastDateInput=t("date")(new Date,"EEE dd-MMM-yyyy"),e.lastItemGroupInput="Other",e.lastItemTypeInput="Other",e.updateLastDateInput=function(o){var n=e.items[o].date,a=t("date")(new Date(n),"EEE dd-MMM-yyyy");e.items[o].date=a,e.lastDateInput=a},e.updateLastItemGroupInput=function(t){var o=e.items[t].itemGroup;e.lastItemGroupInput=o},e.updateLastItemTypeInput=function(t){var o=e.items[t].itemType;e.lastItemTypeInput=o},e.open=function(t,o){t.preventDefault(),t.stopPropagation(),e.datePickerOpenedItems[o]=!0},e.deleteItem=function(t){var o;for(o in e.items.ids)if(e.items.ids[o]===t){e.items.ids.splice(o,1),delete e.items[t];break}console.log(e.items)},e.getStateJSON=function(){var t={items:e.items,uncheckedItems:e.uncheckedItems};return JSON.stringify(t)},e.loadFromFile=function(t){var o=JSON.parse(t);null!==o&&(e.items=o.items,e.uncheckedItems=o.uncheckedItems)},e.downloadFile=function(){var o=e.getStateJSON(),n=t("date")(new Date,"dd-MMM-yyyy_HH_mm_ss")+".demo2.bkr",a=document.createElement("a");a.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(o)),a.setAttribute("download",n),a.style.display="none",document.body.appendChild(a),a.click(),document.body.removeChild(a)},e.autoSaveLocalStorage=function(){};var a=function(){return{id:n(),date:t("date")(new Date(e.lastDateInput),"EEE dd-MMM-yyyy"),name:"",itemType:e.lastItemTypeInput,itemGroup:e.lastItemGroupInput,price:0}};e.statement={itemTypes:["Income","Expense","Other"],itemGroups:["Eat-in Cash","Delivery Cash","Just Eat Cash","Eat-in Card","Delivery Card","Just Eat Card","Eat-in Cheque","Delivery Cheque","Other"]},e.items={ids:[]},e.uncheckedItems={},e.addItem=function(){var t=new a;e.items[t.id]=t,e.datePickerOpenedItems[t.id]=!1,e.items.ids.push(t.id)},e.toggleItemCheck=function(t){e.uncheckedItems[t]?delete e.uncheckedItems[t]:e.uncheckedItems[t]=!0}}]).filter("itemDays",function(){return function(e){var t=0,o=[];for(t in e.ids){var n=e[e.ids[t]].date;-1===o.indexOf(n)&&o.push(n)}return o.sort(function(e,t){return new Date(e)-new Date(t)})}}).filter("dayTotal",function(){return function(e,t,o,n){var a=0,i=0;for(a in e.ids){var c=e[e.ids[a]];n.uncheckedItems[c.id]||c.date!==t||c.itemType!==o||(i+=Number(c.price))}return i}}).filter("dayBalance",["dayTotalFilter",function(e){return function(t,o,n){return e(t,o,"Income",n)-e(t,o,"Expense",n)}}]).filter("groupTotal",function(){return function(e,t,o,n,a){var i=0,c=0;for(i in e.ids){var s=e[e.ids[i]];a.uncheckedItems[s.id]||s.date!==t||s.itemGroup!==o||s.itemType!==n||(c+=Number(s.price))}return c}}).filter("groupBalance",["groupTotalFilter",function(e){return function(t,o,n,a){return e(t,o,n,"Income",a)-e(t,o,n,"Expense",a)}}]).filter("groupItem",function(){return function(e,t,o,n){var a=0,i=[];for(a in e.ids){var c=e[e.ids[a]];c.date===t&&c.itemGroup===o&&c.itemType===n&&i.push(c)}return i}}).filter("weeksOfItems",function(){return function(e){var t,o=[];for(t in e.ids){var n=e[e.ids[t]].date,a=new Date(n).getTime(),i=Math.floor(a/6048e5);-1===o.indexOf(i)&&o.push(i)}return o.sort()}}).filter("weekDateRange",["dateFilter",function(e){return function(t){var o=6048e5,n=o*t-3456e5,a=o*(t+1)-432e6,i="EEE dd-MMM-yyyy";return e(new Date(n),i)+" - "+e(new Date(a),i)}}]).filter("itemsInWeek",function(){return function(e,t){var o,n=[];for(o in e.ids){var a=e[e.ids[o]].date,i=new Date(a).getTime(),c=Math.floor(i/6048e5);c===t&&n.push(e.ids[o])}return n}}).filter("weekTotal",["numberFilter",function(e){return function(t,o,n,a){var i=0,c=0,s=0,d=0;for(i in t.ids){var l=t[t.ids[i]];if(!a.uncheckedItems[l.id]&&l.itemType===n){var r=l.date,p=new Date(r).getTime(),m=Math.floor(p/6048e5);m===o&&(c++,d+=Number(l.price)),s++}}return"("+c+"/"+s+"): "+e(d,2)}}]).filter("weekItems",["numberFilter",function(e){return function(e,t,o){var n,a=[];for(n in e.ids){var i=e[e.ids[n]],c=i.date,s=new Date(c).getTime(),d=Math.floor(s/6048e5);d===t&&i.itemType===o&&a.push(i)}return a}}]),angular.module("site").controller("Demo1Ctrl",["$scope","$filter",function(e,t){e.startDate="",e.endDate="",e.format="EEE dd-MMM-yyyy",e.open=function(t,o){t.preventDefault(),t.stopPropagation(),"start"===o?e.stateOpened=!0:e.endOpened=!0},e.validDates=!1,e.checkDates=function(){if(e.startDate<=e.endDate){e.validDates=!0;for(var o=e.startDate.getTime()-e.startDate.getMilliseconds(),n=864e5,i=e.endDate.getTime()-e.endDate.getMilliseconds();i>=o;o+=n)e.dayRecords.push(new a(t("date")(new Date(o),"EEE dd-MMM-yyyy")))}},e.getStateJSON=function(){var t={startDate:e.startDate,endDate:e.endDate,dayRecords:e.dayRecords};return JSON.stringify(t)},e.loadFromFile=function(t){var o=JSON.parse(t);null!==o&&(e.startDate=o.startDate,e.endDate=o.endDate,e.dayRecords=o.dayRecords,e.validDates=!0)},e.downloadFile=function(){var o=e.getStateJSON(),n=t("date")(e.startDate,"dd-MMM-yyyy"),a=t("date")(e.endDate,"dd-MMM-yyyy"),i=n+"_"+a+".demo1.bkr",c=document.createElement("a");c.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(o)),c.setAttribute("download",i),c.style.display="none",document.body.appendChild(c),c.click(),document.body.removeChild(c)},e.autoSaveLocalStorage=function(){};var o=function(){return{date:"",name:"",price:0,checked:!0}},n=function(e){var t={name:e,incomeItems:[new o],expenseItems:[new o]};return t};e.addIncomeItem=function(e){e.incomeItems.push(new o)},e.addExpenseItem=function(e){e.expenseItems.push(new o)},e.totalIncome=function(e){var t,o=0;for(t in e.incomeItems){var n=e.incomeItems[t];n.checked&&(o+=Number(n.price))}return o},e.totalExpense=function(e){var t,o=0;for(t in e.expenseItems){var n=e.expenseItems[t];n.checked&&(o+=Number(n.price))}return o},e.totalBalance=function(t){return e.totalIncome(t)-e.totalExpense(t)};var a=function(e){return{name:e,groups:[new n("Eat-in Cash"),new n("Delivery Cash"),new n("Just Eat Cash"),new n("Eat-in Card"),new n("Delivery Card"),new n("Just Eat Card"),new n("Eat-in Cheque"),new n("Delivery Cheque"),new n("Other")]}};e.dayRecords=[]}]).directive("onReadFile",["$parse",function(e){return{restrict:"A",scope:!1,link:function(t,o,n){var a=e(n.onReadFile);o.on("change",function(e){var o=new window.FileReader;o.onload=function(e){t.$apply(function(){a(t,{$fileContent:e.target.result})})},o.readAsText((e.srcElement||e.target).files[0])})}}}]).filter("groupTotalIncome",function(){return function(e,t){return t.totalIncome(e)}}).filter("dayTotalIncome",function(){return function(e,t){var o,n=0;for(o in e.groups){var a=e.groups[o];n+=t.totalIncome(a)}return n}}).filter("groupTotalExpense",function(){return function(e,t){return t.totalExpense(e)}}).filter("dayTotalExpense",function(){return function(e,t){var o,n=0;for(o in e.groups){var a=e.groups[o];n+=t.totalExpense(a)}return n}}).filter("groupTotalBalance",function(){return function(e,t){return t.totalBalance(e)}}).filter("dayTotalBalance",function(){return function(e,t){var o,n=0;for(o in e.groups){var a=e.groups[o];n+=t.totalBalance(a)}return n}}),angular.module("site").run(["$templateCache",function(e){e.put("app/demo2/demo.html",'<div class="container"><div class="row"><button type="button" class="btn btn-primary col-md-6" ng-click="downloadFile()">Download Record</button><div class="col-md-2">Upload Record:</div><input type="file" class="col-md-4" value="Upload Records" on-read-file="loadFromFile($fileContent)"></div><br><tabset><tab heading="Items"><div class="row" ng-repeat="itemID in items.ids"><div class="col-md-3"><p class="input-group"><input type="text" class="form-control" ng-disabled="true" datepicker-popup="{{format}}" ng-model="items[itemID].date" ng-change="updateLastDateInput(itemID)" is-open="datePickerOpenedItems[itemID]" close-text="Close"> <span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="open($event, itemID)"><i class="glyphicon glyphicon-calendar"></i></button></span></p></div><div class="col-md-3"><p class="input-group"><label class="col-md-4">Item Name:</label> <input type="text" placeholder="Item Name" ng-model="items[itemID].name"></p></div><div class="col-md-2"><div class="input-group"><label class="col-md-4">Price:</label> <input type="text" placeholder="0.00" class="col-md-8" ng-keydown="keyDown($event, items.ids.length)" ng-model="items[itemID].price"></div></div><div class="col-md-3 row"><div class="col-md-6"><select class="form-control" ng-model="items[itemID].itemType" ng-options="opt for opt in statement.itemTypes" ng-change="updateLastItemTypeInput(itemID)"></select></div><div class="col-md-6"><select class="form-control" ng-model="items[itemID].itemGroup" ng-options="opt for opt in statement.itemGroups" ng-change="updateLastItemGroupInput(itemID)"></select></div></div><div class="col-md-1 row"><button type="button" class="btn btn-danger" ng-click="deleteItem(itemID)" confirm="Are you sure?">Delete Item</button></div></div><br><div class="col-md-12 row"><button type="button" class="btn btn-info col-md-12" ng-click="addItem()" confirm="Are you sure?">点击按钮 或 输入价格后同时按下 Alt+A 添加新条目</button></div></tab><tab heading="Statement"><accordion close-others="false"><accordion-group is-open="dayStatus.open" ng-repeat="day in items | itemDays"><accordion-heading><div class="row"><span class="col-md-2">{{ day }}</span> <span class="col-md-2">Income: {{ items | dayTotal:day:"Income":this }}</span> <span class="col-md-2">Expense: {{ items | dayTotal:day:"Expense":this }}</span> <span class="col-md-2">Other: {{ items | dayTotal:day:"Other":this }}</span> <i class="col-md-1 pull-right glyphicon" ng-class="{\'glyphicon-chevron-down\': dayStatus.open, \'glyphicon-chevron-right\': !dayStatus.open}"></i></div></accordion-heading><div class="col-md-12 row"><accordion close-others="false"><accordion-group is-open="groupStatus.open" ng-repeat="group in statement.itemGroups"><accordion-heading><div class="row"><span class="col-md-2">{{ group }}</span> <span class="col-md-2">Income: {{ items | groupTotal:day:group:"Income":this }}</span> <span class="col-md-2">Expense: {{ items | groupTotal:day:group:"Expense":this }}</span> <span class="col-md-2">Balance: {{ items | groupBalance:day:group:this }}</span> <span class="col-md-2">Other: {{ items | groupTotal:day:group:"Other":this }}</span> <i class="col-md-1 pull-right glyphicon" ng-class="{\'glyphicon-chevron-down\': groupStatus.open, \'glyphicon-chevron-right\': !groupStatus.open}"></i></div></accordion-heading><div class="col-md-12 row"><div class="col-md-2"></div><div class="col-md-3 row"><div class="col-md-12 row" ng-repeat="item in items | groupItem:day:group:\'Income\'"><div class="input-group col-md-12 row"><span class="input-group-addon"><input type="checkbox" ng-checked="!uncheckedItems[item.id]" ng-click="toggleItemCheck(item.id)"></span> <input type="text" placeholder="Item Name" class="form-control" ng-model="item.name"></div><div class="input-group col-md-12 row"><label class="col-md-4">Price:</label> <input type="text" placeholder="0.00" class="col-md-8" ng-model="item.price"></div></div></div><div class="col-md-3 row"><div class="col-md-12 row" ng-repeat="item in items | groupItem:day:group:\'Expense\'"><div class="input-group col-md-12 row"><span class="input-group-addon"><input type="checkbox" ng-checked="!uncheckedItems[item.id]" ng-click="toggleItemCheck(item.id)"></span> <input type="text" placeholder="Item Name" class="form-control" ng-model="item.name"></div><div class="input-group col-md-12 row"><label class="col-md-4">Price:</label> <input type="text" placeholder="0.00" class="col-md-8" ng-model="item.price"></div></div></div><div class="col-md-2 row"></div><div class="col-md-3 row"><div class="col-md-12 row" ng-repeat="item in items | groupItem:day:group:\'Other\'"><div class="input-group col-md-12 row"><span class="input-group-addon"><input type="checkbox" ng-checked="!uncheckedItems[item.id]" ng-click="toggleItemCheck(item.id)"></span> <input type="text" placeholder="Item Name" class="form-control" ng-model="item.name"></div><div class="input-group col-md-12 row"><label class="col-md-4">Price:</label> <input type="text" placeholder="0.00" class="col-md-8" ng-model="item.price"></div></div></div></div></accordion-group></accordion></div></accordion-group></accordion></tab><tab heading="Weekly Statement"><accordion close-others="false"><accordion-group is-open="dayStatus.open" ng-repeat="week in items | weeksOfItems"><accordion-heading><div class="row"><span class="col-md-12">{{ week | weekDateRange }}</span></div><div class="row"><span class="col-md-4">Income {{ items | weekTotal:week:"Income":this }}</span> <span class="col-md-4">Expense {{ items | weekTotal:week:"Expense":this }}</span> <span class="col-md-4">Other {{ items | weekTotal:week:"Other":this }}</span></div></accordion-heading><div class="col-md-12 row"><tabset><tab heading="Income"><accordion close-others="false"><accordion-group is-open="dayStatus.open" ng-repeat="day in items | itemDays"><accordion-heading><div class="row"><span class="col-md-12">{{ day }}: {{ items | dayTotal:day:"Income":this }}</span> <i class="col-md-1 pull-right glyphicon" ng-class="{\'glyphicon-chevron-down\': dayStatus.open, \'glyphicon-chevron-right\': !dayStatus.open}"></i></div></accordion-heading><div class="col-md-12 row"><accordion close-others="false"><accordion-group is-open="groupStatus.open" ng-repeat="group in statement.itemGroups"><accordion-heading><div class="row"><span class="col-md-12">{{ group }}: {{ items | groupTotal:day:group:"Income":this }}</span> <i class="col-md-1 pull-right glyphicon" ng-class="{\'glyphicon-chevron-down\': groupStatus.open, \'glyphicon-chevron-right\': !groupStatus.open}"></i></div></accordion-heading><div class="col-md-12 row" ng-repeat="item in items | groupItem:day:group:\'Income\'"><div class="input-group col-md-12 row"><span class="input-group-addon"><input type="checkbox" ng-checked="!uncheckedItems[item.id]" ng-click="toggleItemCheck(item.id)"></span> <input type="text" placeholder="Item Name" class="form-control" ng-model="item.name"></div><div class="input-group col-md-12 row"><label class="col-md-4">Price:</label> <input type="text" placeholder="0.00" class="col-md-8" ng-model="item.price"></div></div></accordion-group></accordion></div></accordion-group></accordion></tab><tab heading="Expense"><div class="col-md-12 row" ng-repeat="item in items | weekItems:week:\'Expense\'"><div class="input-group col-md-12 row"><span class="input-group-addon"><input type="checkbox" ng-checked="!uncheckedItems[item.id]" ng-click="toggleItemCheck(item.id)"></span> <input type="text" placeholder="Item Name" class="form-control" ng-model="item.name"></div><div class="input-group col-md-12 row"><label class="col-md-4">Price:</label> <input type="text" placeholder="0.00" class="col-md-8" ng-model="item.price"></div></div></tab><tab heading="Other"><div class="col-md-12 row" ng-repeat="item in items | weekItems:week:\'Other\'"><div class="input-group col-md-12 row"><span class="input-group-addon"><input type="checkbox" ng-checked="!uncheckedItems[item.id]" ng-click="toggleItemCheck(item.id)"></span> <input type="text" placeholder="Item Name" class="form-control" ng-model="item.name"></div><div class="input-group col-md-12 row"><label class="col-md-4">Price:</label> <input type="text" placeholder="0.00" class="col-md-8" ng-model="item.price"></div></div></tab></tabset></div></accordion-group></accordion></tab></tabset></div>'),e.put("app/demo1/demo.html",'<div class="container"><div class="row" ng-show="!validDates"><div class="col-md-6">Start Date</div><div class="col-md-6">End Date</div><div class="col-md-6"><p class="input-group"><input type="text" class="form-control" ng-disabled="true" datepicker-popup="{{format}}" ng-model="startDate" is-open="stateOpened" close-text="Close"> <span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="open($event, \'start\')"><i class="glyphicon glyphicon-calendar"></i></button></span></p></div><div class="col-md-6"><p class="input-group"><input type="text" class="form-control" ng-disabled="true" datepicker-popup="{{format}}" ng-model="endDate" is-open="endOpened" close-text="Close"> <span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="open($event, \'end\')"><i class="glyphicon glyphicon-calendar"></i></button></span></p></div><button type="button" class="btn btn-primary col-md-4" ng-click="checkDates()">Confirm Start and End Dates</button><div class="col-md-2"></div><div class="col-md-2">Upload Record:</div><input type="file" class="col-md-4" on-read-file="loadFromFile($fileContent)"></div><div ng-show="validDates"><button type="button" class="btn btn-primary" ng-click="downloadFile()">Download</button><accordion close-others="false"><accordion-group is-open="dayStatus.open" ng-repeat="dayRecord in dayRecords"><accordion-heading><div class="row"><span class="col-md-2">{{ dayRecord.name }}</span> <span class="col-md-3">Income: {{ dayRecord | dayTotalIncome:this }}</span> <span class="col-md-3">Expense: {{ dayRecord | dayTotalExpense:this }}</span> <span class="col-md-3">Balance: {{ dayRecord | dayTotalBalance:this }}</span> <i class="col-md-1 pull-right glyphicon" ng-class="{\'glyphicon-chevron-down\': dayStatus.open, \'glyphicon-chevron-right\': !dayStatus.open}"></i></div></accordion-heading><div class="col-md-12 row"><div class="col-md-12"><accordion close-others="false"><accordion-group is-open="groupStatus.open" ng-repeat="group in dayRecord.groups"><accordion-heading><div class="row"><span class="col-md-2">{{ group.name }}</span> <span class="col-md-3">Income: {{ group | groupTotalIncome:this }}</span> <span class="col-md-3">Expense: {{ group | groupTotalExpense:this }}</span> <span class="col-md-3">Balance: {{ group | groupTotalBalance:this }}</span> <i class="col-md-1 pull-right glyphicon" ng-class="{\'glyphicon-chevron-down\': groupStatus.open, \'glyphicon-chevron-right\': !groupStatus.open}"></i></div></accordion-heading><div class="col-md-12 row"><div class="col-md-2"></div><div class="col-md-4 row"><div class="col-md-12 row" ng-repeat="item in group.incomeItems"><div class="input-group col-md-12 row"><span class="input-group-addon"><input type="checkbox" ng-model="item.checked"></span> <input type="text" placeholder="Item Name" class="form-control" ng-model="item.name"></div><div class="input-group col-md-12 row"><label class="col-md-4">Price:</label> <input type="text" placeholder="0.00" class="col-md-8" ng-model="item.price"></div></div><div class="col-md-12 glyphicon glyphicon-plus" ng-click="addIncomeItem(group)"></div></div><div class="col-md-4 row"><div class="col-md-12 row" ng-repeat="item in group.expenseItems"><div class="input-group col-md-12 row"><span class="input-group-addon"><input type="checkbox" ng-model="item.checked"></span> <input type="text" placeholder="Item Name" class="form-control" ng-model="item.name"></div><div class="input-group col-md-12 row"><label class="col-md-4">Price:</label> <input type="text" placeholder="0.00" class="col-md-8" ng-model="item.price"></div></div><div class="col-md-12 glyphicon glyphicon-plus" ng-click="addExpenseItem(group)"></div></div><div class="col-md-3 row"></div></div></accordion-group></accordion></div></div></accordion-group></accordion></div></div>'),e.put("app/main/main.html",'<div class="container"><a ui-sref="demo1">Demo 1</a><br><a ui-sref="demo2">Demo 2</a></div>')}]);