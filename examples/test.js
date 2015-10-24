'use strict'
var stage = new createjs.Stage("demoCanvas");
document.getElementById("es").addEventListener('change', function(e){E = Number(e.target.value);calc()});
document.getElementById("r1s").addEventListener('change', function(e){R1 = Number(e.target.value);calc()});
document.getElementById("r2s").addEventListener('change', function(e){R2 = Number(e.target.value);calc()});
document.getElementById("r3s").addEventListener('change', function(e){R3 = Number(e.target.value);calc()});

var E = 5;
var R1 = 1000;
var R2 = 1000;
var R3 = 1000;

var p1 = {x: 25, y: 150};
var p2 = {x: 25, y: 50};
var p3 = {x: 100+25/2, y: 50};
var p4 = {x: 100+25/2, y: 175};
var p41 = {x: 200+25/2, y: 175}
var p5 = {x: 100+25/2, y: 290};

var p6 = {x: 25, y: 290};
var p7 = {x: 25, y: 160};

var p8 = {x: 100+25/2, y: 275};
var p9 = {x: 200+25/2, y: 275};
var p10 = {x: 200+25/2, y: 290};
var p11 = {x: 100+25/2, y: 290};

drawScheme(stage);

var graph = new CircuitViz.digraph.Digraph();
var a = graph.addVertex();
var b = graph.addVertex();
var c = graph.addVertex();
var d = graph.addVertex();
var arc1 = graph.addArc(a,b);
var arc2 = graph.addArc(b,c);
var arc3 = graph.addArc(b,c);
var arc4 = graph.addArc(c,d);
var out1 = new CircuitViz.model.Output();
var out2 = new CircuitViz.model.Output();
var out3 = new CircuitViz.model.Output();
var out4 = new CircuitViz.model.Output();
arc1.setAmperage(out1);
arc2.setAmperage(out2);
arc3.setAmperage(out3);
arc4.setAmperage(out4);

var vis = new CircuitViz.visualization.Visualization(graph);
vis.addChain(arc1, [p1,p2,p3,p4]);
vis.addChain(arc2, [p4,p5]);
vis.addChain(arc3, [p4,p41,p10,p11]);
vis.addChain(arc4, [p5,p6,p7]);

stage.addChild(vis);
vis.start();
vis.update(true);
calc();
createjs.Ticker.framerate = 60;
createjs.Ticker.addEventListener('tick', function(){stage.update();});


function calc()
{
	var R23 = R2*R3/(R2+R3);
	var i1 = E/(R1+R23);
	out1.setValue(i1);
	out4.setValue(i1);
	var i2 = (E-i1*R1)/R2;
	var i3 = (E-i1*R1)/R3;
	out2.setValue(i2);
	out3.setValue(i3);
}

function drawScheme(st)
{	
	var lines = new createjs.Shape();
	lines.graphics.ss(1).s('#000000').mt(25,150).lt(25,50).
	lt(100+25/2,50).lt(100+25/2,100).
	mt(100+25/2,150).lt(100+25/2,200).
	mt(100+25/2,200+50).lt(100+25/2,300).
	mt(100+25/2,290).lt(25,290).lt(25,160).
	mt(100+25/2,175).lt(200+25/2,175).lt(200+25/2,290).lt(100+25/2,290);
	st.addChild(lines);
	
	res(100,100,'R1');
	res(100,200,'R2');
	res(200,200,'R3');
	source(0,150);
	ground(100-25/2,300);
	
	function res(x,y,text)
	{
		var res = new createjs.Shape();
		res.graphics.ss(1).s('#000000').beginFill('#ffffff').drawRect(0,0,25,50);
		res.x = x;
		res.y = y;
		st.addChild(res);
		var txt = new createjs.Text(text);
		txt.x = x+35;
		txt.y = y+50/2;
		st.addChild(txt);
	}
	function source(x,y)
	{
		var source = new createjs.Shape();
		source.graphics.ss(1).s('#000000').mt(0,0).lt(50,0).mt(10,10).lt(40,10);
		source.x = x;
		source.y = y;
		st.addChild(source);
	}
	function ground(x,y)
	{
		var ground = new createjs.Shape();
		ground.graphics.ss(1).s('#000000').mt(0,0).lt(50,0).mt(15,10).lt(35,10).mt(22.5,20).lt(28.5,20);
		ground.x = x;
		ground.y = y;
		st.addChild(ground);
	}
}