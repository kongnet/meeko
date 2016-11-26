/*global describe*/
/*global it*/
'use strict';
var $ = require('../index');
let assert = require(`assert`);
//let req = require(`co-request`);

var b = {
	id: {
		desc: 'id',
		req: 1,
		type: 'int'
	},
	name: {
		desc: '节点名称',
		type: 'string'
	},
	code: {
		desc: '节点编码',
		type: 'bool'
	},
	rights: {
		desc: '节点权限',
		type: 'positive'
	},
	description: {
		desc: '节点详情',
		type: 'negative'
	},
	type: {
		desc: '节点类型',
		type: 'number'
	},
	datetime: {
		desc: '节点类型',
		type: 'datetime'
	}
};
describe(`checkParam的单元测试`, function() {
	assert.deepEqual(1, $.log($.c.cls + $.c.xy(0, 0)));
	it(`int`, function*() {
		yield $.tools.wait(1);
		let a = {
			id: 1
		};
		assert.deepEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: undefined
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: null
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: ''
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 'true'
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 'false'
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: true
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: false
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: -1
		};
		assert.deepEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 0
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1.9
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
	});
	it(`string`, function*() {
		let a = {
			id: 1,
			name: 1
		};
		assert.deepEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1
		};
		assert.deepEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			name: undefined
		};
		assert.deepEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			name: null
		};
		assert.deepEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			name: ''
		};
		assert.deepEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			name: 'abc'
		};
		assert.deepEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			name: true
		};
		assert.deepEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			name: false
		};
		assert.deepEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			name: -1
		};
		assert.deepEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			name: 0
		};
		assert.deepEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			name: 1.9
		};
		assert.deepEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
	});
	it(`bool`, function*() {
		let a = {
			id: 1,
			code: 1
		};
		assert.deepEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1
		};
		assert.deepEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			code: undefined
		};
		assert.deepEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			code: null
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			code: ''
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			code: 'abc'
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			code: true
		};
		assert.deepEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			code: false
		};
		assert.deepEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);

		a = {
			id: 1,
			code: 'true'
		};
		assert.deepEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			code: 'false'
		};
		assert.deepEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);

		a = {
			id: 1,
			code: '0'
		};
		assert.deepEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			code: '1'
		};
		assert.deepEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);

		a = {
			id: 1,
			code: -1
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			code: 0
		};
		assert.deepEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			code: 1.9
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
	});
	it(`positive`, function*() {
		let a = {
			id: 1,
			rights: 1
		};
		assert.deepEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1
		};
		assert.deepEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			rights: undefined
		};
		assert.deepEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			rights: null
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			rights: ''
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			rights: 'abc'
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			rights: true
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			rights: false
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			rights: -1
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			rights: 0
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			rights: 1.9
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
	});
	it(`negative`, function*() {
		let a = {
			id: 1,
			description: 1
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1
		};
		assert.deepEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			description: undefined
		};
		assert.deepEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			description: null
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			description: ''
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			description: 'abc'
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			description: true
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			description: false
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			description: -1
		};
		assert.deepEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			description: 0
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			description: 1.9
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
	});
	it(`number`, function*() {
		let a = {
			id: 1,
			type: 1
		};
		assert.deepEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1
		};
		assert.deepEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			type: undefined
		};
		assert.deepEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			type: null
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			type: ''
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			type: 'abc'
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			type: true
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			type: false
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			type: -1
		};
		assert.deepEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			type: 0
		};
		assert.deepEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			type: 1.9
		};
		assert.deepEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
	});
	it(`datetime`, function*() {
		let a = {
			id: 1,
			datetime: 1
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1
		};
		assert.deepEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			datetime: undefined
		};
		assert.deepEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			datetime: null
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			datetime: ''
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			datetime: 'abc'
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			datetime: true
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			datetime: false
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			datetime: -1
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			datetime: 0
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			datetime: 1.9
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			datetime: '1999-06-06 12:0:0'
		};
		assert.deepEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			datetime: '2016-01-05T11:22:20.527Z'
		};
		assert.deepEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
	});
});
describe(`uuid的单元测试`, function() {
	it(`有len`, function*() {
		assert.notDeepEqual('nUazy3Dk3u', $.tools.uuid(10, 64), 'nUazy3Dk3u');
	});
	it(`无len`, function*() {
		assert.notDeepEqual('2EC9D207-DCA5-4D96-A397-F1371D053AEB', $.tools.uuid(), '2EC9D207-DCA5-4D96-A397-F1371D053AEB');
		assert.notDeepEqual('2EC9D207-DCA5-4D96-A397-F1371D053AEB', $.tools.uuid(null, 64), '2EC9D207-DCA5-4D96-A397-F1371D053AEB');
	});
});
describe(`Date原型扩展的单元测试`, function() {
	var d1 = new Date('2015-12-29 01:11:01');
	var d2 = new Date('2016-01-02 20:09:31');
	it(`getWeek`, function*() {
		assert.deepEqual(52, d1.getWeek());
		assert.deepEqual(52, d2.getWeek());
	});
	it(`date2Str`, function*() {
		assert.deepEqual('2015-12-29 01:11:01', d1.date2Str());
		assert.deepEqual('2016-01-02 20:09:31', d2.date2Str());
	});
	it(`date8`, function*() {
		assert.deepEqual('20151229', d1.date8());
		assert.deepEqual('20160102', d2.date8());
	});
	it(`dateAdd年`, function*() {
		assert.deepEqual('2016-12-29 01:11:01', d1.dateAdd('y', 1).date2Str());
		assert.deepEqual('2015-12-29 01:11:01', d1.dateAdd('y', -1).date2Str());
	});
	it(`dateAdd季度`, function*() {
		assert.deepEqual('2016-03-29 01:11:01', d1.dateAdd('q', 1).date2Str());
		assert.deepEqual('2015-12-29 01:11:01', d1.dateAdd('q', -1).date2Str());
	});
	it(`dateAdd月`, function*() {
		assert.deepEqual('2016-01-29 01:11:01', d1.dateAdd('m', 1).date2Str());
		assert.deepEqual('2015-12-29 01:11:01', d1.dateAdd('m', -1).date2Str());
	});
	it(`dateAdd周`, function*() {
		assert.deepEqual('2016-01-05 01:11:01', d1.dateAdd('w', 1).date2Str());
		assert.deepEqual('2015-12-29 01:11:01', d1.dateAdd('w', -1).date2Str());
	});
	it(`dateAdd日`, function*() {
		assert.deepEqual('2015-12-30 01:11:01', d1.dateAdd('d', 1).date2Str());
		assert.deepEqual('2015-12-29 01:11:01', d1.dateAdd('d', -1).date2Str());
	});
	it(`dateAdd时`, function*() {
		assert.deepEqual('2015-12-29 02:11:01', d1.dateAdd('h', 1).date2Str());
		assert.deepEqual('2015-12-29 01:11:01', d1.dateAdd('h', -1).date2Str());
	});
	it(`dateAdd分`, function*() {
		assert.deepEqual('2015-12-29 01:12:01', d1.dateAdd('n', 1).date2Str());
		assert.deepEqual('2015-12-29 01:11:01', d1.dateAdd('n', -1).date2Str());
	});
	it(`dateAdd秒`, function*() {
		assert.deepEqual('2015-12-29 01:11:02', d1.dateAdd('s', 1).date2Str());
		assert.deepEqual('2015-12-29 01:11:01', d1.dateAdd('s', -1).date2Str());
	});

	it(`dateDiff`, function*() {
		//assert.deepEqual(0,d1.dateDiff('y',d2));

	});
});
describe(`String原型扩展的单元测试`, function() {
	it(`fillStr`, function*() {
		assert.deepEqual('abaaaa', 'ab'.fillStr('a', 6));
		assert.deepEqual('ab    ', 'ab'.fillStr(' ', 6));

	});
	it(`toMoney`, function*() {
		assert.deepEqual('-9,812,345,678.45678901', '-9812345678.45678901'.toMoney());
		assert.deepEqual('9,812,345,678.45678901', '9812345678.45678901'.toMoney());
		assert.deepEqual('-9,812,345,678.45', '-9812345678.45678901'.toMoney(2));
		assert.deepEqual('-9,812,345,678', '-9812345678.45678901'.toMoney(0));
		assert.deepEqual('0.45', '.45678901'.toMoney(2));
		assert.deepEqual('-0.45', '-.45678901'.toMoney(2));
		assert.deepEqual(2, 'abc'.toMoney(2));
	});
	it(`replaceAll`, function*() {
		assert.deepEqual('aaaxxxccc', 'aaabbbccc'.replaceAll('b', 'x'));
	});
	it(`times`, function*() {
		assert.deepEqual('xxx', 'x'.times(3));
		assert.deepEqual('', 'x'.times(0));
	});
	it(`trim`, function*() {
		assert.deepEqual('xxx', ' xxx   '.trim());
	});
	it(`toLow`, function*() {
		assert.deepEqual('abc1', 'ABC1'.toLow());
	});
	it(`toUp`, function*() {
		assert.deepEqual('ABC1', 'abc1'.toUp());
	});
	it(`format`, function*() {
		assert.deepEqual('abcdefg1', 'a{0}c{1}e{2}g{3}'.format('b', 'd', 'f', 1));
	});
	it(`len`, function*() {
		assert.deepEqual(5, '我们a'.len());
	});
	it(`toInt`, function*() {
		assert.deepEqual(12, '12.3'.toInt());
	});
	it(`esHtml`, function*() {
		assert.deepEqual('&amp;&lt;&gt;', '&<>'.esHtml());
	});
	it(`toHtml`, function*() {
		assert.deepEqual('&<>', '&amp;&lt;&gt;'.toHtml());
	});
	it(`reHtml`, function*() {
		assert.deepEqual('xxyy', '<div><a>xx</a><div><div>yy</div>'.reHtml());
	});
	it(`camelize`, function*() {
		assert.deepEqual('aBC', 'a-b-c'.camelize());
	});
	it(`ac`, function*() {
		assert.deepEqual('ab c', 'ab'.ac('c'));
	});
	it(`dc`, function*() {
		assert.deepEqual('ab', 'ab c'.dc('c'));
	});
	it(`tc`, function*() {
		assert.deepEqual('ab c', 'ab'.tc('c'));
		assert.deepEqual('ab', 'ab c'.tc('c'));
	});
});
describe(`Number原型扩展的单元测试`, function() {
	it(`round`, function*() {
		assert.deepEqual(1.123457, 1.123456789.round(6));
		assert.deepEqual(1, 1.123456789.round(0));
	});
});
describe(`Array原型扩展的单元测试`, function() {
	it(`copy`, function*() {
		assert.deepEqual([1].copy(), [1]);
	});
});
describe(`Buffer原型扩展的单元测试`, function() {
	it(`contact`, function*() {
		let buf = new Buffer([1, 2]);
		let buf1 = buf.contact(new Buffer([3, 4]))
		assert.deepEqual(3, buf1[2]);
	});
});
describe(`随机数的单元测试`, function() {
	it(`random`, function*() {
		assert.deepEqual($.tools.rnd(1, 1), 1);
		assert.deepEqual($.tools.rnd(100, 100), 100);
		assert.deepEqual($.tools.rnd(-100, -100), -100);
		assert.deepEqual($.tools.rnd(-1, -1), -1);
		assert.deepEqual($.tools.rnd(0, 0), 0);
	});
});
describe(`utf8 & lzw测试`, function() {
	it(`utf8&lzw`, function*() {
		assert.deepEqual($.tools.utf8.encode('你好abc'), 'ä½ å¥½abc');
		assert.deepEqual($.tools.utf8.decode('ä½ å¥½abc'), '你好abc');
		assert.deepEqual($.tools.lzw.compress($.tools.utf8.encode('你好abc')),'Ã¤Â½Â Ã¥Âć½abc'); 
		assert.deepEqual($.tools.utf8.decode($.tools.lzw.uncompress('Ã¤Â½Â Ã¥Âć½abc')), '你好abc');

	});
});
describe(`其他函数的单元测试`, function() {
	it(`ext`, function*() {
		assert.deepEqual(null, $.ext('', ''));
	});
	it(`log`, function*() {
		assert.deepEqual(1, $.log(1, 2));
		assert.deepEqual(1, $.log({}, 2));
		assert.deepEqual(1, $.err(1, 2));
		assert.deepEqual(1, $.err({}, 2));

	});
});