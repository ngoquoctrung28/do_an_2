	
var image1 = new Image(); image1.src="ex.gif";
var image2 = new Image(); image2.src="oh.gif";

var level, myway, mynextmove;
var tmp, done, iswon, content;
// tính điểm theo 4 cấp độ
var pcwins = [0,0,0,0];

// tính điểm theo 4 cấp độ
var playerwins = [0,0,0,0];	
var draws = [0,0,0,0]; 
var playerstarts = true;

// Kiểm tra xem ô trống đã được đánh hay chưa
var moves = new Array();


var game=new Array(9);
var choices=[11,12,13,21,22,23,31,32,33];
var corners=[11,13,31,33];

var ways=new Array();
ways[1]=[0,11,12,13];
ways[2]=[0,21,22,23];
ways[3]=[0,31,32,33];
ways[4]=[0,11,21,31];
ways[5]=[0,12,22,32];
ways[6]=[0,13,23,33];
ways[7]=[0,11,22,33];
ways[8]=[0,13,22,31]; 

var w3c=(document.getElementById)?true:false;
var ns4=(document.layers) ? true:false;
var ie4=(document.all && !w3c)?true:false;
var ie5=(document.all && w3c)?true:false;
var ns6=(w3c && navigator.appName.indexOf("Netscape")>=0)?true:false;

// ham khoi tao
function init()
{
	oktoplay=true;
	iswon=false;
	done=0;	
	if (level != undefined) {writetext(4);}
// '0' là ô chưa chọn '1' là đã chọn rồi
	moves[11] = 0; moves[12]=0; moves[13]=0; moves[21]=0; moves[22]=0; moves[23]=0; moves[31]=0; moves[32]=0; moves[33]=0;
	
	for(i=0;i<=8;i++)
	{
		document.images['rc'+choices[i]].src="nothing.gif";
		document.images['rc'+choices[i]].alt="";
		game[i]=0;
	}

	if(!playerstarts)pcturn();
}

function writetext(num)
{
	switch(num)
	{
		case 1: content='Game này huề nhau.';
		break;
		case 2: content='Máy tính thắng game này.';
		break;
		case 3: content='Bạn thắng game này.';
		break;
		case 4: content='LEVEL: '+level+'\n\n Máy tính thắng	  :  (Điểm : '+(pcwins[0]+pcwins[1]+pcwins[2]+pcwins[3])+')\n Người chơi thắng :  (Điểm : '+(playerwins[0]+playerwins[1]+playerwins[2]+playerwins[3])+')\n Huề nhau	  :  (Điểm : '+(draws[0]+draws[1]+draws[2]+draws[3])+')';
		break;
	}

	// Hàm reset
	document.scores.scores2.value=content
	if(num<4)setTimeout('init(4)',1000);
}

//Chọn cấp độ
function setlevel(x)
{
	if (level!=x)
	{
		level=x;
		init();
	}
}

function setbutton(cellnum)
{
	if (!iswon)
	{ 			
		if(level == null) {
			alert('Vui lòng chọn Level!')
			
		}
		else if(moves[cellnum]==0){
			// Thay đổi hình
			document.images['rc'+cellnum].src= "ex.gif";
			document.images['rc'+cellnum].alt= " X ";

			// Khóa ô đã chọn nếu trùng sẽ báo lỗi
			moves[cellnum] = 1;

			// Lưu vị trí đánh của người chơi
			game[done] = cellnum;
			done++;
			findwinner(true);
			
		}
		else if(moves[cellnum] == 1){
			alert('Bạn không thể chọn vị trí này!')
		};
	}
}

function pcstrategy(istowin)
{		
	if (level>0)
	{	
		var str=(istowin)? 2 : 1;
		for(n=1;n<=8;n++)
		{
			if((moves[ways[n][1]]==str) && (moves[ways[n][2]]==str) && (moves[ways[n][3]]==0)) tmp=ways[n][3];
			if((moves[ways[n][1]]==str) && (moves[ways[n][3]]==str) && (moves[ways[n][2]]==0)) tmp=ways[n][2];
			if((moves[ways[n][2]]==str) && (moves[ways[n][3]]==str) && (moves[ways[n][1]]==0)) tmp=ways[n][1];
		}
	}
}


function selecCorner(which)	
 {	

	if (which=="empty")
	 {
		do
		 {
			tmp=corners[Math.floor(Math.random()*4)];
		 }
		while(moves[tmp]!=0);
	 }
	else
	tmp=corners[Math.floor(Math.random()*4)];

 }

//Máy tính không thể thua 2 3
function pcdontlose() 
 {  
 	// người đánh trước
	if (!playerstarts)
	{
		if (done==0)
		{
			tmp=choices[2*Math.floor(Math.random()*5)];
			if (tmp==22) myway=1;
			else myway=2;
		}
		else if (done==2)
		{	
			// nếu như con đầu tiên pc đánh là ô giữa
			if (myway==1)
			{	
				// nếu mình đánh ô chéo so với vị trí giữa nó sẽ đánh ô còn lại
				if (game[1]==11 || game[1]==13 || game[1]==31 || game[1]==33)
				tmp=44-game[1];	


				// nếu như mình đánh ô ngang bên này, thì nó sẽ đánh ô chéo bên kia
				else
				{
					dlta=22-game[1];
					op0=22+dlta+(10/dlta);
					op1=22+dlta-(10/dlta);
					tmp=eval("op"+Math.floor(Math.random()*2));
				}
		    }

		    // nếu như pc đánh không phải ô giữa
			else if (myway==2)	
			{	
				// nếu mình đánh ô giữa, pc sẽ đánh chéo, so với ô đầu tiên pc đánh
				if (game[1]==22)
				{
					tmp=44-game[0];
					myway=21;
				}

				// nếu như mình đánh ô trong khoảng[11,13,31,33], 
				// thì pc cũng sẽ đánh 1 ô nằm trong corners=[11,13,31,33] mà không trùng
				else if (game[1]==11 || game[1]==13 || game[1]==31 || game[1]==33)
				{
					selecCorner("empty");
					myway=22;
				}
				// như mình đánh ngang pc sẽ đánh giữa
				else
				{
					tmp=22;
					myway=23;
				}
			}
		}

		if (done==4)
		{
			// myway == 22 khi pc đánh 2 còn ở nằm trong corners=[11,13,31,33] 
			// và mình đánh 1 còn nằm trong corners=[11,13,31,33] 
			// thì nó sẽ đánh ô còn lại nằm trong corners=[11,13,31,33]
			if (myway==22)
			{
				for (i=0; i<4 ;i++)
				{            
					if (moves[corners[i]]==0)
					{
						tmp=corners[i];
					}
				}
			}

			// myway = 23 khi
			// khi pc đánh còn ở thứ nhất nằm trong corners=[11,13,31,33] 
			// người chơi đánh ô nằm ngang hoặc dọc (trừ ô 22)
			// khi pc đánh còn ở thứ 2 nằm ở giữa (22)

			// thì nó sẽ đánh ô nằm trong khoảng [11,13,31,33] 
			else if (myway==23)
			{
				dlta=game[1]-game[0];
				op0=44-(game[1]+dlta);
				op1=(op0+game[0])/2;
				tmp=eval("op"+Math.floor(Math.random()*2));
			}
			else if (myway==1)
			tmp=44+game[2]-(2*game[3]);
		}
     }

    // nếu người chơi đánh trước và lv 3
	else if (level==3)
	{
		if (done==1)
		{	
			// nếu như người chơi đánh trong khoảng [11,13,31,33]

			// thì máy sẽ đánh ô giữa (22)
			if (game[0]==11 || game[0]==13 || game[0]==31 || game[0]==33)
			{
				tmp=22;
				myway=1;
			}

			// nếu người chơi đánh ô giữa

			// thì máy sẽ đánh trong khoảng [11,13,31,33]
			else if (game[0]==22)
			{
				selecCorner("any");
				myway=2;
			}

			// người chơi đánh ô nằm ngang hoặc dọc (trừ ô 22)
			// thì máy sẽ đánh ô giữa
			else
			{
				tmp=22;
				myway=3;
			}
		}

		else if (done==3)
		{	
			// myway == 1 khi
			// lượt 1: người chơi đánh trong khoảng [11,13,31,33]
			// lượt 2: máy đánh ô giữa
			if (myway==1)
			{
				// nếu lượt 3 người chơi đánh ô nằm ngang hoặc dọc (trừ ô 22)
				// thì máy sẽ đánh ô [11,13,31,33]

				// và ngược lại  
				// người chơi đánh trong khoảng [11,13,31,33]
				// thì máy  đánh ô nằm ngang hoặc dọc (trừ ô 22)
				if (game[2]==44-game[0])
				tmp=choices[1+(2*Math.floor(Math.random()*4))];
				else
				tmp=44-game[0]
			}

			// myway == 2 khi
			// lượt 1: người chơi đánh ô giữa
			// lượt 2: máy  đánh trong khoảng [11,13,31,33]
			else if (myway==2)
			{

				if (game[2]==44-game[1])
				selecCorner("empty");
			}

			else if (myway==3)
			{
				if (game[2]==11 || game[2]==13 || game[2]==31 || game[2]==33)
				tmp=44-game[2];
				if (game[2]==44-game[0])
				{
					dlta=22-game[2];
					tmp=22+(10/dlta);
					mynextmove=tmp+dlta;
				}

				else
				{
					dlta=22-game[0];
					op0=game[0]+(10/dlta);	
					op1=game[0]-(10/dlta);	
					op2=game[2]+dlta;	
					tmp=eval("op"+Math.floor(Math.random()*3));
				}
			}
		}

		else if (done==5 && myway==3)
		{
			tmp=mynextmove;
		}
	}
}


function findwinner(isplayer)
{
	
	if (isplayer == true){ 
		me = 1
	} else {
		me = 2;
	}

	// kiểm tra người chơi thắng
	// máy thắng
	// hay huề 
	for( n=1;n<=8;n++)
	{	
		// kiểm tra xem người chơi hoặc máy đã đánh 3 ô.Của 1 trong 8 cách thắng chưa (ways)
		// kiểm tra các cách thắng
		if( (moves[ways[n][1]] == me) && (moves[ways[n][2]] == me) && (moves[ways[n][3]] == me) )
		{
			iswon=true;
			break;
		}
	}

	// cộng điểm của level được chọn lên 1
	// writetext thông  báo số điểm line 60-72
	if(iswon)
	{	
		// nếu người chơi thắng
		if(isplayer)
		{
			playerwins[level]++;
			playerstarts=true;
			writetext(3);
		}
		// nếu pc thắng
		else
		{
			pcwins[level]++;
			playerstarts=false;
			writetext(2);
		}
	}

		// kiểm tra các ô được đánh chưa
		// nếu đánh ô hết rồi thì sẽ hòa:
		//	-- sẽ đổi lượt cho người bên kia đánh line 380
		// 	-- writetext sẽ thông báo kết quả
	else
	{			
		if(done>8)
		{
			draws[level]++;
			playerstarts=!playerstarts;
			writetext(1);
		}

		// nếu không có ai thắng và chưa đánh hết ô
		// mà isplayer = true thì chuyển lượt cho máy đánh
		// mà isplayer = false thì chuyển lượt cho người đánh
		else if(isplayer) pcturn();
	}
}

// chọn ramdom 1 ô ngẫu nhiên
function pcrandom()
{
	do
	{
		tmp=choices[Math.floor(Math.random()*9)];
	}
		while(moves[tmp]!=0);
}

function pcturn()
{
	tmp='00';
	pcstrategy(true);
	if(tmp=='00')pcstrategy(false); // level > 0
	if(tmp=='00' && level>1)
		pcdontlose();
	if(tmp=='00')
		pcrandom();
	moves[tmp]=2;
	game[done]=tmp;
	document.images['rc'+tmp].src="oh.gif";
	document.images['rc'+tmp].alt=" O ";
	done++;

	findwinner(false);
}

window.onload=init;

window.onresize=function()
{
  if(ns4)setTimeout('history.go(0)',400);
}



// lv 0 máy sẽ ramdom 1 ô bất kì chưa đánh
// lv 1 bắt đầu từ lượt 3 sẽ đánh đường thắng, nếu không có đường thắng sẽ đánh chặn đường thắng, nếu không có cả 2 sẽ ramdom
// lv 2 :
//		-- nếu người chơi đánh trước thì như lv 1
//		-- nếu máy đánh trước sẽ ramdom đánh trong khoảng [11,13,22,31,33] 
// 			-- trường hợp 1 ramdom lượt 1:  đánh ô trong [11,13,31,33] 
//					lượt 2: người chơi đánh ô giữa
//					thì lượt 3: máy sẽ đánh ô trong khoảng [11,13,31,33] theo đường thẳng (so với 2 ô của 2 lượt trên)
// 					mấy lượt còn lại sẽ đánh ô thắng, nếu không có đường thắng sẽ đánh chặn đường thắng, nếu không có cả 2 sẽ ramdom trong khoảng [11,13,31,33]

//			-- trường hợp 2 ramdom lượt 1:  đánh ô giữa
//					lượt 2: 
// 						-- trường hợp 1: người chơi đánh ô trong khoảng [11,13,31,33] thì máy sẽ đánh ô trong khoảng [11,13,31,33] theo đường thẳng (so với 2 ô của 2 lượt trên)
// 						-- trường hợp 2: nếu như người đánh ô ngang hoặc dọc bên này, thì nó sẽ đánh nó chéo bên kia ( trong khoảng [11,13,31,33] )
//	

// lv 3: 
//		-- nếu máy đánh  trước thì giải thuật như lv 2 đánh trước
// 		-- nếu máy đánh sau :
// 						-- trường hợp 1: 
// 								-- lượt 1:người chơi đánh ô trong khoảng [11,13,31,33] 
// 								-- lượt 2: máy sẽ đánh ô giữa
//								-- lượt 3: 
//										-- trường hợp 1: người chơi đánh ô nằm ngang hoặc dọc (trừ ô 22) 
//											thì lượt 4: máy sẽ đánh ô [11,13,31,33]

//										-- trường hợp 2: người chơi đánh trong khoảng [11,13,31,33]
//											thì máy  đánh ô nằm ngang hoặc dọc (trừ ô 22)
// 						-- trường hợp 2: 
// 								-- lượt 1:người chơi đánh ô giữa
// 								-- lượt 2: máy sẽ đánh ô trong khoảng [11,13,31,33] 
//								-- lượt 3: người chơi đánh ô bất kì
// 								-- lượt 4: đánh đường thắng, nếu không có đường thắng sẽ đánh chặn đường thắng, nếu không có cả 2 sẽ ramdom trong khoảng [11,13,31,33] 
// 						-- trường hợp 3: 
// 								-- lượt 1: người chơi đánh ô nằm ngang hoặc dọc (trừ ô 22)
// 								-- lượt 2: máy sẽ đánh ô giữa
//								-- lượt 3: người chơi đánh ô bất kì
// 								-- lượt 4: đánh đường thắng, nếu không có đường thắng sẽ đánh chặn đường thắng, nếu không có cả 2 sẽ ramdom trong khoảng [11,13,31,33] 
