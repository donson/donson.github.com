#pop API

例子：[link](http://donson.github.io/aipai/apm/doc/examples/example.html)

##参数

* 默认参数
```javascript
    opts = {
        ref     : null,     //参照目标
        refTop  : 0,
        isClose : true,
        con     : '',       //html代码
        btns : [{           //按钮
            text : '关闭',
            handler : 'close'
        }],
        onShow : function(){}
    };
```

* 参数id
```javascript
    opts = {
        id : 'pop_abc'	
        //弹出层的id，不填会调用$.uuid生成一个随机id：pop_697a6437-7743-5474-8d12-ac9bd9929ac6
    };
```

* 参数ref & refTop 
```javascript
    opts = {
        ref : $('#mod'),	//参照目标，传入一个$对象，以对象底部为参照
        refTop : 20			//对参照目标的一个偏移量，可以传负数
    };
```

* 参数isClose
```javascript
    opts = {
        isClose : true  	//是否显示右上角关闭按钮，默认true，`(true | false)`
    };
```

* 参数con
```javascript
    opts = {
    	//con 可以传html代码的字符串，也可以是一个Fun，返回html代码
        con : '',  			//html代码
        con : function(thisPop){
        	//con有1个参数：thisPop指向pop对象本身
        	
            var html = '';
            
            //处理  
                     
            return html;
        }
    };
```

* 参数btns
```javascript
    opts = {
    	//btns是一个数组，最多可以传2个对象，如果传一个空有数组[]，表示没有按钮
    	//每个对象有 text, gray, handler, href, target 等值
    	//text：是按钮的文字
    	//gray：按钮的背景色，默认为false，传true会使当前按钮变灰色
    	//handler : 'close' || Fun，传字符串'close'表示关闭，传Fun显示点击后执行此Fun
    	//hanler Fun有2个参数，$pop是当前弹出层的$对象，thisPop指向pop对象本身
    	//href：默认为空值，如果传了值表示当前按钮是一个链接，优先级大于handler
    	//target：当href值不为空时，target设置当前按钮链接的打开方式
        btns : [{
            text : '',
            gray : true, 
            handler : 'close'
        }, {
            text : '',
            handler : function($pop, thisPop){
                //$pop
            	var $num = $pop;

            	//thisPop 
            	thisPop.remove();
            }
        }]
    };
```
* 参数onShow
```javascript
    opts = {
    	//onShow有2个参数，$pop是当前弹出层的$对象，thisPop指向pop对象本身
        onShow : function($pop, thisPop){
            //$pop
            var $num = $pop;

            //thisPop 
            thisPop.remove();
        }
    };
```


##基本使用

* 使用SeaJS模块化，require 书写约定
```javascript
    define(function(require, exports, module) {
        var pop = require('apm/pop');
        pop({
            msg : '这是一个提示';
        });
    });
```

* 一个简单的提示框 
```javascript
    pop({
        msg : '这是一个提示';
    });
```

* 一个简单的确认框 
```javascript
    pop({
        msg : '这是一个confirm.',
        btns : [{
            text : '取消',
            gray : true,
            handler : 'close'
        },{
            text : '确定',
            handler : function(thisPop){
                alert('Yes, I do.');
            }
        }]
    });
```

* Example1
```javascript
    var button = $.query('#pop_exa1');
    button.click(function(){
        var btn = $(this);
        pop({
            ref : btn,      //参照目标：当前按钮
            refTop : 20,  //相对参照目标高度偏移量
            ti : '下载拍大师,录制并发布视频',
            con : '<div class="pm_pds"><a target="_blank" href="http://app.aipai.com/paidashi"></a></div>',
            isClose : false,    //隐藏关闭按钮
            btns : [{
                text : '取消',
                gray : true,
                handler : 'close'
            }, {
                text : '马上下载',
                href : 'http://app.aipai.com/paidashi', //按钮是链接
                target : '_blank'
            }]
        });
    });
```

* Example2
```javascript
    pop({
        ti : '赠送鲜花',
        con : function(thisPop){
            var html = '',
                pmChoose = thisPop.modChoose({
                    cur : '30', //当前选中key
                    data : [
                        ['50', '50'], //key, value
                        ['30', '30'],
                        ['20', '20'],
                        ['10', '10']
                    ] 
                }),
                pmForm = '<div class="pm_form">\
                                <div class="pm_fin">\
                                    <input type="text" class="fl_input" placeholder="点击输入数量" value="" />\
                                </div>\
                                <div class="pm_ftxt">\
                                    <span>你今天剩余：<em class="num">0</em>朵鲜花</span>\
                                    <a target="_blank" href="http://vip.aipai.com">开通VIP享受更多鲜花</a>\
                                </div>\
                            </div>';
                //<span class="hidden">输入有误，请重新输入</span>\
            html = pmChoose + pmForm;
            return html;
        },
        btns : [{
            text : '送花',
            //点击按钮后执行
            handler : function($pop, thisPop){
                var num = $pop.find('.fl_input').val();
                alert(num);

                thisPop.remove();
            }
        },{
            text : '取消',
            gray : true,
            handler : 'close'
        }],
        //显示完执行
        onShow : function($pop, thisPop){
            var $num = $pop.find('.num'),
                $input = $pop.find('.fl_input'),
                $pmChoose = $pop.find('.pm_choose'),
                initNum = '30';

            //设置用户鲜花数
            $num.html(100);

            //输入框
            $input.val(initNum);
            $input.blur(function(){
                var v = $(this).val();
                if(v != initNum){
                    $pmChoose.find('li').removeClass('cur');
                }
            });

            //选择
            $pmChoose.on('click', 'li', function(){
                $pmChoose.find('li').removeClass('cur');
                var num = $(this).addClass('cur').data('key');
                $input.val(num);
                initNum = num;
            });
        }
    });
```
    };
