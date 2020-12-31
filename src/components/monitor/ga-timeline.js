/*eslint-disable*/
const config = {
     // 滑块颜色
    'spanColor': '#a2993e',
    // 滑块按钮颜色
    'buttonColor': '#ff8251',
    // 箭头颜色
    'arrowColor': '#4f8ee5',
    // 圆点的边的颜色
    'boderColor': '#05D4FC',
    // 'boderColor': '#FFEC00',
    // 圆的颜色
    // 'circleColor': '#1874F0',
    'circleColor': '#FFEC00',
    // 起点时间
    'threshold': new Date(),
    // 整个刻度
    'number': 97,
    // 是否禁止拖拽
    'isFixedDrag': true,
    // 是否自由拖动
    'isFreeDrag': true,
    // 时间类型
    'type': 'halfhour',
    // 自动播放的时长
    'delaytime':'5000',
    // 时间格式
    'dateFormat': 'yyyy-MM-dd mm:hh:ss',
    'callback': function () {}
}
Date.prototype.add = function (interval, value) {
    var d = new Date(this.getTime());
    if (!interval || value === 0) { return d; }

    switch (interval.toLowerCase()) {
        case 'milli' :
            d.setMilliseconds(d.getMilliseconds() + value);
            break;
        case 'second' :
            d.setSeconds(d.getSeconds() + value);
            break;
        case 'minute' :
            d.setMinutes(d.getMinutes() + value);
            break;
        case 'hour' :
            d.setHours(d.getHours() + value);
            break;
        case 'day' :
            d.setDate(d.getDate() + value);
            break;
        case 'month' :
            var new_year = d.getYear();
            var new_month = d.getMonth() + 1 + value;
            if (d.getMonth() > 12) {
                new_month -= 12;
                new_year++;
            }
            var new_date = new Date(new_year, new_month, 1);
            var lastDayOfPrevMonth =
                (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate();
            if (d.getDate() > lastDayOfPrevMonth) {
                d.setDate(lastDayOfPrevMonth);
            }
            var month = d.getMonth() + value;
            d.setMonth(month);
            break;
        case 'year' :
            d.setFullYear(d.getFullYear() + value);
            break;
    }
    return d;
};
Date.prototype.format = function (pattern) {
    var fullyear = this.getFullYear(), minyear = fullyear.toString()
        .substring(2), month = this.getMonth() + 1, day = this.getDate(), hour = this
        .getHours(), minute = this.getMinutes(), second = this.getSeconds(), ms = this
        .getMilliseconds();
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    if (hour < 10) {
        hour = '0' + hour;
    }
    if (minute < 10) {
        minute = '0' + minute;
    }
    if (second < 10) {
        second = '0' + second;
    }
    if (ms < 10) {
        ms = '00' + ms;
    } else if (ms < 100) {
        ms = '0' + ms;
    }
    if (!pattern) {
        pattern = 'yyyy-MM-dd hh:mm:ss';
    }
    return pattern.replace('yyyy', fullyear).replace('yy', minyear).replace(
        'MM', month).replace('dd', day).replace('hh', hour).replace('mm',
        minute).replace('ss', second).replace('SSS', ms);
};
const QUARTER = 'quarter'
const HOUR = 'hour'
const YESTER = 'yesterday'
const DATE = 'date'
const HH = 'halfhour'
const FIVE = 'five'



const drawUtils = {
    // 横轴颜色
    bgLineColor: 'rgba(0,164,255,0.30)',
    bgLineColorLight: '#00C4FF',
    // 下刻度线文字颜色
    bbTextColor : "#fff",
    // 上分割线颜色
    lineTopScaleColor : "rgba(0,0,0,0)",
    // 下刻度线颜色
    lineBottomScaleColor : "#fff",
    // 上分割线圆球颜色
    lineCycle:"#00fefe",
    // 滑块文本颜色
    spanRangeTextColor: "#00a7f2",
    // 高亮的时间轴
    lineDark: '',
    /**
     * 创建上刻度线小球
     * @param p [x,y]
     */
    getTopLineCycle(p){
      var circle = new createjs.Shape();
      circle.graphics.setStrokeStyle(1).beginStroke(this.lineCycle).beginFill(this.lineCycle).drawCircle(0,0,2);
      circle.set({
          x:p[0],
          y:p[1]
      });
      TweenMax.from(circle, 0.5, {alpha: 0});
      return circle
    },
    /**
     * 创建线
     */
    _getLine(p1, p2,color){
      var line = new createjs.Shape();
      line.graphics.setStrokeStyle(1).beginStroke(color).moveTo(p1[0],p1[1]).lineTo(p2[0],p2[1]).endStroke();
      return line;
    },
    /**
     * 创建上刻度线
     * @param  p1   [x1 ,y1] 开始点
     * @param p2 [x2 y2]  结束点
     */
    getTopLine(p1, p2){
      var line = this._getLine(p1,p2,this.lineTopScaleColor);
      TweenMax.from(line, 0.3, {scaleY: 0});
      return line;
    },
    //
    /**
     *  topLine 左文字
     *  @param name
     *  @param  p
     */
    getTopLineLeftText(name , p ){
      var text = this._getTLineText(name,p);
      text.textAlign = 'left';
      text.textBaseline = 'bottom';
      TweenMax.from(text, 0.3, {alpha: 0, x: '+=20'});
      return text;
    },
    /**
     *  topLine 右文字
     *  @param name
     * @param  p
     */
    getTopLineRightText(name, p){
      var text = this._getTLineText(name,p);
      text.textAlign = 'right';
      text.textBaseline = 'bottom';
      TweenMax.from(text, 0.3, {alpha: 0, x: '-=20'});
      return text;
    },
    /**
     * 获取下刻度线
     * @param  p1   [x1 ,y1] 开始点
     * @param  p2   [x2 y2]  结束点
     */
    getBottomLine(p1, p2){
      var line = this._getLine(p1,p2, this.lineTopScaleColor);
      TweenMax.from(line, 0.2, {scaleY: 0});
      return line;
    },
    /**
     * 获取线 下面文字
     * @param  p  [x ,y]
     */
    getBottomLineText(name , p){
      var text = this._getTLineText(name,p);
      text.textAlign = 'center';
      text.fontFamily = 'lcdd';
      text.color = "#A2EEFF"; // f00
      // 在滑块之外的刻度  透明 50%
      TweenMax.from(text, 0.3, {alpha: 0});
      return text;
    },
    /**
     * 创建text
     * @param t  String
     * @param p [x,y]
     */
    _getTLineText(t ,p){
      var _text = new createjs.Text(t, 'bold 12px Microsoft YaHei');
      _text.set({
          x: p[0],
          y: p[1],
          color: "#fff"
      });
      return _text;
    },
    isFirstQuarterOfHour(date){
      return date.getMinutes() < 15;
    },
    // 一小时里第一个5分钟刻度
    isFisrtFiveOfHour(date){
      return date.getMinutes() > -1;
    },
    isFirstHourOfDay(date){
      return date.getHours() == 0;
    },
    isFirstDayOfMonth(date) {
      return date.format('MM') !== date.add('day', -1).format('MM');
    },
    // 一小时里第一个半小时刻度
    isFirstHHofHour(date){
        return date.getMinutes() < 30;
    },
    /**
     * 检查是否为关键刻度 目的去突出线条
     * @param beginTime 时间
     * @param type 刻度类型
     */
    isNeedProminentLine(beginTime , type){
      let flag = false;
      if(FIVE == type &&  drawUtils.isFisrtFiveOfHour(beginTime) )flag = true;
      if(HH == type &&  drawUtils.isFirstHHofHour(beginTime) )flag = true;
      if(QUARTER == type && drawUtils.isFirstQuarterOfHour(beginTime) )flag = true;
      return flag;
    }
}


/**
 * [NX定制版时间轴]
 * @type {[type]}
 */
export default class TimelinePick {
    constructor (opts) {
        this.options = Object.assign({}, config, opts);
        this.create();
        this.drawCore();
        this.drawTopArrow();
        this.start();
        // this.startPlay();
    }
    create () {
        this.init()
    }
    init () {
        this.box = $(this.options.el);
        this.box.empty();
        this.canvas = $('<canvas></canvas>');
        this.canvasDom = this.canvas.get(0);
        this.canvas.appendTo(this.box)
            .attr({ 'width': this.box.width(), 'height': this.box.height() });
        this.stage = new createjs.Stage(this.canvasDom);
        this.stage.enableMouseOver(10);
        this.stage.xp = this.canvasDom.width;
        this.stage.yp = this.canvasDom.height;
        if (!this.nowTime) {
            this.nowTime = this.options.threshold;
        }
        this.paddingX = 30 ;
        // 创建线性变量
        this.xScale = d3.scale.linear()
            .domain([0, this.options.number])
            .range([0, this.stage.xp - (this.paddingX * 2)]);
        this.spanDis = this.xScale(1) - this.xScale(0);
        this.arrowColor = this.options.arrowColor;
    }
    start () {
        var me = this;
        createjs.Ticker.setFPS(60);
        createjs.Ticker.removeAllEventListeners();
        createjs.Ticker.addEventListener('tick', function () {
            me.stage.update();
        })
    }

    // 暂停播放
    pausePlay(){
        window.clearTimeout(this.playtimer)
        this.pauseStatus = true;
    }

    // 清空状态归位
    clearPlay(){
        window.clearTimeout(this.playtimer)
        this.lastPIndex = 0
        this.autoPosArrow(this.options.number-1)
        this.playStatus = false
        this.pauseStatus = false;
    }

    // 开始定时播放
    startPlay(){
        // 播放状态
        this.playStatus = true;
        window.clearTimeout(this.playtimer)
        if(!this.pauseStatus){
            this.commondPlay()
        }
        this.playtimer  = setInterval(()=>{
            this.commondPlay()
        },this.options.delaytime)
        this.pauseStatus = false;
    }

    commondPlay(){
        // 移除上一步画的高亮的时间轴
        this.stageBg.removeChild(drawUtils.lineDark);
        let toIndex = this.lastPIndex !==undefined ? this.lastPIndex : 0;
        if(toIndex > this.options.number - 1){
            toIndex = 0;
            this.lastPIndex = 0;
        }
        this.autoPosArrow(toIndex)
        // 重画高亮的时间轴
        drawUtils.lineDark = this._createCodeline(toIndex)
        this.stageBg.addChild(drawUtils.lineDark);
        this.lastPIndex = toIndex
        this.lastPIndex ++
        this.options.callback(this.caculateTimeSpan());
    }

    //自动定位到指定idnex
    autoPosArrow(index){
        this.topArrow.set({
            x : this._getXByIndex(index)
        })
        this.options.spanIndex.start = index;
        this.options.spanIndex.end = index + 1;
    }

    // 画时间轴
    drawCore () {
        let type = this.options.type;
        const me = this;
        // 背景线颜色
        if (me.stageBg) {
            me.stageBg.removeAllChildren();
        } else {
            me.stageBg = new createjs.Container();
            me.stage.addChild(me.stageBg);
        }
        let lineContainer = new createjs.Container();
        var beginTime,formatCode;
        var bottomScale;
        if(HH  === type ) {
            beginTime = me.nowTime.add("minute",  30 * (- me.options.number + 1));
        }else if(FIVE === type){
            beginTime = me.nowTime.add("minute",  5 * (- me.options.number + 1));
        }else if(YESTER === type){
            beginTime = me.nowTime.add("hour",  1 * (- me.options.number + 1));
            new Date(beginTime.setHours(0, 0, 0, 0)) / 1000;
        } else if(HOUR === type) {
            beginTime = me.nowTime.add("hour",  1 * (- me.options.number + 1));
        }else if(DATE === type){
            beginTime = me.nowTime.add("day",  1 * (- me.options.number + 1));
        }
        for(let i = 0 ;i<me.options.number ;i++){
            bottomScale = new createjs.Container();
            let textPointY = 12;
            let linePointY = 8;
            if (drawUtils.isNeedProminentLine(beginTime,type)){
                linePointY = 10;
            }
            let line =  drawUtils.getTopLine([me.xScale(i), 0], [me.xScale(i),-linePointY]);
            if (i < me.options.spanIndex.start || i >= me.options.spanIndex.end) {
                line.alpha = 0.5;
            }
            bottomScale.addChild(line);
            if(HH === type){
                if (drawUtils.isFirstHHofHour(beginTime)) {
                  let text = drawUtils.getBottomLineText(beginTime.format("hh"), [me.xScale(i), textPointY]);
                  if ( i < me.options.spanIndex.start || i >= me.options.spanIndex.end ) {
                          text.alpha = 0.5;
                  }else{
                     // text.color = drawUtils.spanRangeTextColor;
                  }
                   bottomScale.addChild(text);
                }
               beginTime = beginTime.add('minute', 30);
            } else if (HOUR === type) {
                let text = drawUtils.getBottomLineText(beginTime.format("hh"), [me.xScale(i), textPointY]);
                if ( i < me.options.spanIndex.start || i >= me.options.spanIndex.end ) {
                    text.alpha = 0.5;
                }else{
                    // text.color = drawUtils.spanRangeTextColor;
                }
                bottomScale.addChild(text);

                beginTime = beginTime.add('hour', 1);
            } else if(FIVE === type){
               if (drawUtils.isFisrtFiveOfHour(beginTime)) {
                  let text = drawUtils.getBottomLineText(beginTime.format("hh:mm"), [me.xScale(i), textPointY]);
                  if ( i < me.options.spanIndex.start || i >= me.options.spanIndex.end ) {
                      text.alpha = 1 / 12;
                  }else{
                     // text.color = drawUtils.spanRangeTextColor;
                  }
                  bottomScale.addChild(text);
               }
               beginTime = beginTime.add('minute', 5);
            }else if(YESTER === type){
                let text = drawUtils.getBottomLineText(beginTime.format("hh"), [me.xScale(i), textPointY]);
                if ( i < me.options.spanIndex.start || i >= me.options.spanIndex.end ) {
                    text.alpha = 0.5;
                }else{
                    // text.color = drawUtils.spanRangeTextColor;
                }
                bottomScale.addChild(text);

                beginTime = beginTime.add('hour', 1);
            }
            if(DATE === type){
                let text = drawUtils.getBottomLineText(beginTime.format("dd"), [me.xScale(i), textPointY]);
                if ( i < me.options.spanIndex.start || i >= me.options.spanIndex.end ) {
                    text.alpha = 0.5;
                }else{
                    // text.color = drawUtils.spanRangeTextColor;
                }
                bottomScale.addChild(text);

                beginTime = beginTime.add('day', 1);
            }
            lineContainer.addChild(bottomScale)
        }
        lineContainer.set({
            x: 30 + me.spanDis / 2,
            y: me.stage.yp * 0.4
        });
        me.stageBg.addChild(lineContainer);
        me.stageBg.addChild(me._createCodeline());
    }
    // 画上箭头
    drawTopArrow(){
        let me = this
        this.topArrow = this._createArrow();

        this.topArrow.on('mouseover', function (e) {
            if(me.isFixedDrag())return ;
            var hoverColor = d3.rgb(this.drawColor).brighter();
            this.shadow = new createjs.Shadow(hoverColor, 0, 0, 5);
        });

        this.topArrow.on('mouseout', function (e) {
            if (this.mousedownFlag) {
                return;
            }
            if(me.isFixedDrag())return ;
            this.shadow = new createjs.Shadow(this.drawColor, 0, 0, 5);
        });

        this.topArrow.on('mousedown', function (e) {
            if(me.isFixedDrag())return ;
            this.deltaStart = e.stageX;
            this.mousedownFlag = true;
            var hoverColor = d3.rgb(this.drawColor).brighter();
            this.shadow = new createjs.Shadow(hoverColor, 0, 0, 5);
            this.mouseOffsetX = e.stageX
        })
        this.topArrow.on('pressmove', function (e) {
            if(me.isFixedDrag())return ;
            if(me.checkBoundsArrow(e.stageX))return ;
            this.set({
              x : e.stageX
            })
        })
        this.topArrow.on('pressup', function (e) {
            if(me.isFixedDrag())return ;
            var positionIndex = (this.x - 30 - me.spanDis / 2) / me.spanDis;
            var newIndex = (((positionIndex * 10) % 10) | 0) < 5 ? positionIndex | 0 : (positionIndex | 0) + 1;
            this.set({
                x: me._getXByIndex(newIndex)
            })
            this.shadow = new createjs.Shadow(this.drawColor, 0, 0, 5);

            this.set({
                x: me._getXByIndex(newIndex)
            })
            me.options.spanIndex.start = newIndex;
            me.options.spanIndex.end = newIndex + 1;
            me.options.callback(me.caculateTimeSpan());

            // 鼠标拖动节点后，移除之前高亮的时间轴，加上新的高亮时间轴，将定时器的序列改为拖动之后的序列
            me.stageBg.removeChild(drawUtils.lineDark);
            drawUtils.lineDark = me._createCodeline(newIndex)
            me.stageBg.addChild(drawUtils.lineDark);
            me.lastPIndex = newIndex
            // me.refreshCaculate()
        })
        this.stage.addChild(this.topArrow);
    }

    // 箭头的边界检查
    checkBoundsArrow(x){
        if (x > this._getXByIndex(this.options.number- 1) || x < this._getXByIndex(0)) {
            return true
        }
        return false
    }

    // 获当前箭头的x位置
    _getXByIndex(index){
        return this.xScale(index) +  this.spanDis / 2 + this.paddingX
    }

    /**
     * 画箭头
     * @return shape
     */
    _createArrow(){
        // var me = this;
        // var arrow = new createjs.Shape();
        // var color = me.arrowColor;
        // let p1 = [0,1];
        // let p2 = [0 - (this.spanDis /2 ), - this.stage.yp * 0.15 ]
        // let p3 = [0 + (this.spanDis /2 ) , - this.stage.yp *0.15 ]
        // arrow.drawColor = color;
        // arrow.graphics.beginFill(color).moveTo(p1[0], p1[1]).lineTo(p2[0], p2[1]).lineTo(p3[0], p3[1]).closePath().endFill();
        // arrow.shadow = new createjs.Shadow(color, 0, 0, 2);
        // arrow.cursor = 'pointer';
        // let index = this.options.number - 1
        // arrow.set({
        //     x: this._getXByIndex(index),
        //     y: me.stage.yp * 0.25
        // })
        // return arrow;

        var me = this;
        var circle = new createjs.Shape();
        var color = me.arrowColor;
        let p1 = [0,1];
        let p2 = [0 - (this.spanDis /2 ), - this.stage.yp * 0.15 ]
        let p3 = [0 + (this.spanDis /2 ) , - this.stage.yp *0.15 ]
        circle.drawColor = color;
        circle.graphics.setStrokeStyle(1).beginStroke(me.options.boderColor).beginFill(me.options.circleColor).drawCircle(0,0,8);
        circle.shadow = new createjs.Shadow(color, 0, 0, 2);
        circle.cursor = 'pointer';
        let index = this.options.number - 1
        circle.set({
            x: this._getXByIndex(index),
            y: me.stage.yp * 0.25 + 14
        })
        return circle
    }

    /**
     * 画主轴
     * @private
     */
    _createCodeline(toIndex = -1){
        // toIndex 为 -1时 画底部透明时间轴，>= 0 时，画高亮的时间轴
        var bgContainer = new createjs.Container();
        var bgBar = new createjs.Shape();
        let x = this.spanDis / 2 - 1
        let totalWidth = this.stage.xp - ( this.paddingX * 2  ) - this.spanDis + 2
        let width = totalWidth
        let bgColor = drawUtils.bgLineColor
        if (toIndex >= 0) {
            width = totalWidth / (this.options.number - 1 ) * toIndex
            bgColor = drawUtils.bgLineColorLight
        }
        bgBar.graphics.beginFill(bgColor)
            .drawRoundRect(x , 0, width, 5, 2)
            .endFill();
        bgContainer.addChild(bgBar);
        bgContainer.set({
            x: this.paddingX,
            y: this.stage.yp * 0.40
        })
        return bgContainer;
    }

    // 刷新
    refresh(){
        this.nowTime = new Date();
        this.setType(this.options.type);
    }
    clearStopCaculate(){
        clearInterval(this.tempTimer);
        clearTimeout(this.tempInterval);
        this.options.callback(this.caculateTimeSpan());
    }
    refreshCaculate(){
        this.drawCore();
        this.drawTopArrow();
        this.options.callback(this.caculateTimeSpan());
    }
    caculateTimeSpan(){
        var me = this,startTime, endTime, timeType,dateFormat;
        timeType = me.options.type == 'date' ? 'date' : me.options.type;
        dateFormat = me.options.dateFormat ;
        // 半小时
        if (me.options.type == HH) {
            var baseTime = me.nowTime.add('minute',30 * (1 - me.options.number));
            startTime = baseTime.add('minute', 30 * me.options.spanIndex.start);
            endTime = baseTime.add('minute', 30 * (me.options.spanIndex.end - 1));
            var ts = startTime.getMinutes() / 30 | 0;
            var te = (endTime.getMinutes() / 30 | 0);
            return {
                startTime: startTime.format('yyyy-MM-dd hh:') + (ts * 30 < 10 ? '0' + ts * 30 : ts * 30) + ":00",
                endTime: endTime.format('yyyy-MM-dd hh:') + (te * 30 < 10 ? '0' + te * 30 : te * 30) + ":00",
                timeType: timeType
            };
        } else if (me.options.type == HOUR) {
            var baseTime = me.nowTime.add('hour', (1 - me.options.number));
            // new Date(baseTime.setHours(0, 0, 0, 0)) / 1000;
            startTime = baseTime.add('hour', 1 * me.options.spanIndex.start);
            endTime = baseTime.add('hour', 1 * (me.options.spanIndex.end - 1));
            var ts = startTime.getHours();
            var te = endTime.getHours();
            return {
                startTime: startTime.format('yyyy-MM-dd ') + (ts < 10 ? '0' + ts : ts) + ":00:00",
                endTime: endTime.format('yyyy-MM-dd ') + (ts < 10 ? '0' + ts : ts) + ":00:00",
                timeType: timeType
            };
        } else if(me.options.type == FIVE){
            var baseTime = me.nowTime.add('minute',5 * (1 - me.options.number));
            startTime = baseTime.add('minute', 5 * me.options.spanIndex.start);
            endTime = baseTime.add('minute', 5 * (me.options.spanIndex.end - 1));
            var ts = startTime.getMinutes() / 5 | 0;
            var te = (endTime.getMinutes() / 5 | 0);
            return {
                startTime: startTime.format('yyyy-MM-dd hh:') + (ts * 5 < 10 ? '0' + ts * 5 : ts * 5) + ":00",
                endTime: endTime.format('yyyy-MM-dd hh:') + (te * 5 < 10 ? '0' + te * 5 : te * 5) + ":00",
                timeType: timeType
            };
        }else if(me.options.type == YESTER){
            var baseTime = me.nowTime.add('hour', (1 - me.options.number));
            new Date(baseTime.setHours(0, 0, 0, 0)) / 1000;
            startTime = baseTime.add('hour', 1 * me.options.spanIndex.start);
            endTime = baseTime.add('hour', 1 * (me.options.spanIndex.end - 1));
            var ts = startTime.getHours();
            var te = endTime.getHours();
            return {
                startTime: startTime.format('yyyy-MM-dd ') + (ts < 10 ? '0' + ts : ts) + ":00:00",
                endTime: endTime.format('yyyy-MM-dd ') + (ts < 10 ? '0' + ts : ts) + ":00:00",
                timeType: timeType
            };
        }else if(me.options.type == DATE){
            var baseTime = me.nowTime.add('day', (1 - me.options.number));
            startTime = baseTime.add('day', me.options.spanIndex.start);
            endTime = baseTime.add('day', (me.options.spanIndex.end - 1));
            var ts = startTime.getDate();
            var te = endTime.getDate();
            return {
                startTime: startTime.format('yyyy-MM-') + (ts < 10 ? '0' + ts : ts) + " 00:00:00",
                endTime: endTime.format('yyyy-MM-') + (ts < 10 ? '0' + ts : ts) + " 00:00:00",
                timeType: timeType
            };
        }
    }
    isFixedDrag(){
        // return this.options.isFixedDrag === "0" || this.playStatus;
        return !this.pauseStatus
    }

    /**
     * 检查向右是否到最大值了
     */
    checkingBound() {
        return this.nowTime.getTime() >= this.options.threshold.getTime()
    }
}
