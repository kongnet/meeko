/*global describe*/
/*global it*/
'use strict';
var $ = require('../index');
let assert = require(`assert`);

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
	},
	d2: {
		desc: '节点类型',
		type: 'd2'
	}
};
describe(`checkParam的单元测试`, function() {
	assert.strictEqual(1, $.log($.c.cls + $.c.xy(0, 0)));
	it(`int`, function*() {
		yield $.tools.wait(1);
		let a = {
			id: 1
		};
		assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: undefined
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: null
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: ''
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 'true'
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 'false'
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: true
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: false
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: -1
		};
		assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 0
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1.9
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
	});
	it(`string`, function*() {
		let a = {
			id: 1,
			name: 1
		};
		assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1
		};
		assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			name: undefined
		};
		assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			name: null
		};
		assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			name: ''
		};
		assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			name: 'abc'
		};
		assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			name: true
		};
		assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			name: false
		};
		assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			name: -1
		};
		assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			name: 0
		};
		assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			name: 1.9
		};
		assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
	});
	it(`bool`, function*() {
		let a = {
			id: 1,
			code: 1
		};
		assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1
		};
		assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			code: undefined
		};
		assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			code: null
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			code: ''
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			code: 'abc'
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			code: true
		};
		assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			code: false
		};
		assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);

		a = {
			id: 1,
			code: 'true'
		};
		assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			code: 'false'
		};
		assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);

		a = {
			id: 1,
			code: '0'
		};
		assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			code: '1'
		};
		assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);

		a = {
			id: 1,
			code: -1
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			code: 0
		};
		assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			code: 1.9
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
	});
	it(`positive`, function*() {
		let a = {
			id: 1,
			rights: 1
		};
		assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1
		};
		assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			rights: undefined
		};
		assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			rights: null
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			rights: ''
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			rights: 'abc'
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			rights: true
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			rights: false
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			rights: -1
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			rights: 0
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			rights: 1.9
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
	});
	it(`negative`, function*() {
		let a = {
			id: 1,
			description: 1
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1
		};
		assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			description: undefined
		};
		assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			description: null
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			description: ''
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			description: 'abc'
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			description: true
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			description: false
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			description: -1
		};
		assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			description: 0
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			description: 1.9
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
	});
	it(`number`, function*() {
		let a = {
			id: 1,
			type: 1
		};
		assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1
		};
		assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			type: undefined
		};
		assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			type: null
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			type: ''
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			type: 'abc'
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			type: true
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			type: false
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			type: -1
		};
		assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			type: 0
		};
		assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			type: 1.9
		};
		assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
	});
	it(`datetime`, function*() {
		let a = {
			id: 1,
			datetime: 1
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1
		};
		assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			datetime: undefined
		};
		assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			datetime: null
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			datetime: ''
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			datetime: 'abc'
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			datetime: true
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			datetime: false
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			datetime: -1
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			datetime: 0
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			datetime: 1.9
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			datetime: '1999-06-06 12:0:0'
		};
		assert.strictEqual(400, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
		a = {
			id: 1,
			datetime: '2016-01-05T11:22:20.527Z'
		};
		assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg);
	});
});
describe(`uuid的单元测试`, function() {
	it(`有len`, function*() {
		assert.notStrictEqual('nUazy3Dk3u', $.tools.uuid(10, 64), 'nUazy3Dk3u');
	});
	it(`无len`, function*() {
		assert.notStrictEqual('2EC9D207-DCA5-4D96-A397-F1371D053AEB', $.tools.uuid(), '2EC9D207-DCA5-4D96-A397-F1371D053AEB');
		assert.notStrictEqual('2EC9D207-DCA5-4D96-A397-F1371D053AEB', $.tools.uuid(null, 64), '2EC9D207-DCA5-4D96-A397-F1371D053AEB');
	});
});
describe(`Date原型扩展的单元测试`, function() {
	var d1 = new Date('2015-12-29 01:11:01');
	var d2 = new Date('2016-01-02 20:09:31');
	it(`getWeek`, function*() {
		assert.strictEqual(52, d1.getWeek());
		assert.strictEqual(52, d2.getWeek());
	});
	it(`date2Str`, function*() {
		assert.strictEqual('2015-12-29 01:11:01', d1.date2Str());
		assert.strictEqual('2016-01-02 20:09:31', d2.date2Str());
	});
	it(`date8`, function*() {
		assert.strictEqual('20151229', d1.date8());
		assert.strictEqual('20160102', d2.date8());
	});
	it(`dateAdd年`, function*() {
		assert.strictEqual('2016-12-29 01:11:01', d1.dateAdd('y', 1).date2Str());
		assert.strictEqual('2015-12-29 01:11:01', d1.dateAdd('y', -1).date2Str());
	});
	it(`dateAdd季度`, function*() {
		assert.strictEqual('2016-03-29 01:11:01', d1.dateAdd('q', 1).date2Str());
		assert.strictEqual('2015-12-29 01:11:01', d1.dateAdd('q', -1).date2Str());
	});
	it(`dateAdd月`, function*() {
		assert.strictEqual('2016-01-29 01:11:01', d1.dateAdd('m', 1).date2Str());
		assert.strictEqual('2015-12-29 01:11:01', d1.dateAdd('m', -1).date2Str());
	});
	it(`dateAdd周`, function*() {
		assert.strictEqual('2016-01-05 01:11:01', d1.dateAdd('w', 1).date2Str());
		assert.strictEqual('2015-12-29 01:11:01', d1.dateAdd('w', -1).date2Str());
	});
	it(`dateAdd日`, function*() {
		assert.strictEqual('2015-12-30 01:11:01', d1.dateAdd('d', 1).date2Str());
		assert.strictEqual('2015-12-29 01:11:01', d1.dateAdd('d', -1).date2Str());
	});
	it(`dateAdd时`, function*() {
		assert.strictEqual('2015-12-29 02:11:01', d1.dateAdd('h', 1).date2Str());
		assert.strictEqual('2015-12-29 01:11:01', d1.dateAdd('h', -1).date2Str());
	});
	it(`dateAdd分`, function*() {
		assert.strictEqual('2015-12-29 01:12:01', d1.dateAdd('n', 1).date2Str());
		assert.strictEqual('2015-12-29 01:11:01', d1.dateAdd('n', -1).date2Str());
	});
	it(`dateAdd秒`, function*() {
		assert.strictEqual('2015-12-29 01:11:02', d1.dateAdd('s', 1).date2Str());
		assert.strictEqual('2015-12-29 01:11:01', d1.dateAdd('s', -1).date2Str());
	});

	it(`dateDiff`, function*() {
		//assert.strictEqual(0,d1.dateDiff('y',d2));

	});
});
describe(`String原型扩展的单元测试`, function() {
	it(`fillStr`, function*() {
		assert.strictEqual('abaaaa', 'ab'.fillStr('a', 6));
		assert.strictEqual('ab    ', 'ab'.fillStr(' ', 6));

	});
	it(`toMoney`, function*() {
		assert.strictEqual('-9,812,345,678.45678901', '-9812345678.45678901'.toMoney());
		assert.strictEqual('9,812,345,678.45678901', '9812345678.45678901'.toMoney());
		assert.strictEqual('-9,812,345,678.45', '-9812345678.45678901'.toMoney(2));
		assert.strictEqual('-9,812,345,678', '-9812345678.45678901'.toMoney(0));
		assert.strictEqual('0.45', '.45678901'.toMoney(2));
		assert.strictEqual('-0.45', '-.45678901'.toMoney(2));
		assert.strictEqual(2, 'abc'.toMoney(2));
	});
	it(`replaceAll`, function*() {
		assert.strictEqual('aaaxxxccc', 'aaabbbccc'.replaceAll('b', 'x'));
	});
	it(`times`, function*() {
		assert.strictEqual('xxx', 'x'.times(3));
		assert.strictEqual('', 'x'.times(0));
	});
	it(`trim`, function*() {
		assert.strictEqual('xxx', ' xxx   '.trim());
	});
	it(`toLow`, function*() {
		assert.strictEqual('abc1', 'ABC1'.toLow());
	});
	it(`toUp`, function*() {
		assert.strictEqual('ABC1', 'abc1'.toUp());
	});
	it(`format`, function*() {
		assert.strictEqual('abcdefg1', 'a{0}c{1}e{2}g{3}'.format('b', 'd', 'f', 1));
	});
	it(`len`, function*() {
		assert.strictEqual(5, '我们a'.len());
	});
	it(`toInt`, function*() {
		assert.strictEqual(12, '12.3'.toInt());
	});
	it(`esHtml`, function*() {
		assert.strictEqual('&amp;&lt;&gt;', '&<>'.esHtml());
	});
	it(`toHtml`, function*() {
		assert.strictEqual('&<>', '&amp;&lt;&gt;'.toHtml());
	});
	it(`reHtml`, function*() {
		assert.strictEqual('xxyy', '<div><a>xx</a><div><div>yy</div>'.reHtml());
	});
	it(`camelize`, function*() {
		assert.strictEqual('aBC', 'a-b-c'.camelize());
	});
	it(`ac`, function*() {
		assert.strictEqual('ab c', 'ab'.ac('c'));
	});
	it(`dc`, function*() {
		assert.strictEqual('ab', 'ab c'.dc('c'));
	});
	it(`tc`, function*() {
		assert.strictEqual('ab c', 'ab'.tc('c'));
		assert.strictEqual('ab', 'ab c'.tc('c'));
	});
});
describe(`Number原型扩展的单元测试`, function() {
	it(`round`, function*() {
		assert.strictEqual(1.123457, 1.123456789.round(6));
		assert.strictEqual(1, 1.123456789.round(0));
	});
});
describe(`Array原型扩展的单元测试`, function() {
	it(`copy`, function*() {
		assert.strictEqual([1].copy()[0], 1);
	});
});
describe(`Buffer原型扩展的单元测试`, function() {
	it(`contact`, function*() {
		let buf = new Buffer([1, 2]);
		let buf1 = buf.contact(new Buffer([3, 4]));
		assert.strictEqual(3, buf1[2]);
	});
});
describe(`随机数的单元测试`, function() {
	it(`random`, function*() {
		assert.strictEqual($.tools.rnd(1, 1), 1);
		assert.strictEqual($.tools.rnd(100, 100), 100);
		assert.strictEqual($.tools.rnd(-100, -100), -100);
		assert.strictEqual($.tools.rnd(-1, -1), -1);
		assert.strictEqual($.tools.rnd(0, 0), 0);
	});
});
describe(`utf8 & lzw测试`, function() {
	it(`utf8&lzw`, function*() {
		assert.strictEqual($.tools.utf8.encode('你好abc'), 'ä½ å¥½abc');
		assert.strictEqual($.tools.utf8.decode('ä½ å¥½abc'), '你好abc');
		assert.strictEqual($.tools.lzw.compress($.tools.utf8.encode('你好abc')), 'Ã¤Â½Â Ã¥Âć½abc');
		assert.strictEqual($.tools.utf8.decode($.tools.lzw.uncompress('Ã¤Â½Â Ã¥Âć½abc')), '你好abc');

	});
});
describe(`深copy测试`, function() {
	it(`deep copy`, function*() {
		assert.strictEqual($.tools.copy('1'), '1');
		assert.strictEqual($.tools.copy(1), 1);
		assert.strictEqual($.tools.copy('{'), '{');
		assert.strictEqual($.tools.copy(11), 11);
		let a = {
			a: 1,
			b: 2
		};
		let b = $.tools.copy(a);
		b.a = 2;
		assert.notStrictEqual(a.a, b.a);
		a = [1, 1];
		b = $.tools.copy(a);
		b[0] = 2;
		assert.notStrictEqual(a[0], b[0]);
	});
});
describe(`timeAgo测试`, function() {
	it(`timeAgo测试`, function*() {
		assert.strictEqual($.tools.timeAgo('2016-1-1', '2017-2-1'), '1年前');
		assert.strictEqual($.tools.timeAgo('2016-1-1', '2016-3-1'), '2个月前');
		assert.strictEqual($.tools.timeAgo('2016-1-1', '2016-1-16'), '15天前');
		assert.strictEqual($.tools.timeAgo('2016-1-1', '2016-1-1 1:13:01'), '1小时前');
		assert.strictEqual($.tools.timeAgo('2016-1-1', '2016-1-1 0:13:01'), '13分钟前');
		assert.strictEqual($.tools.timeAgo('2016-1-1', '2016-1-1 0:0:50'), '50秒前');

	});
});
describe(`其他函数的单元测试`, function() {
	it(`ext`, function*() {
		assert.strictEqual(null, $.ext('', ''));
	});
	it(`log`, function*() {
		assert.strictEqual(1, $.log(1, 2));
		assert.strictEqual(1, $.log({}, 2));
		assert.strictEqual(1, $.err(1, 2));
		assert.strictEqual(1, $.err({}, 2));

	});
});