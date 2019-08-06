var img = document.querySelector('.div_2').children;
var is_down = false; //判断鼠标是否按下
var this_e_2 = {
	a: '', //a元素是左边鼓的,a[0]是目前鼓所播放的,a[1]是顶替上来的
	b: '',
	item: 'a' //当前拖动到的是哪个元素上
}
var gu = document.querySelector('.div_1').children
var this_e = null; //获取当前的img图片
var is_posi = false; //判断移动的图片是否移到对应的鼓上
var is_onclick=false; //判断点击的时候是否点击到两鼓其中一个
for(var i in img) {
	img[i].onmousedown = function(e) {
		move_down(e)
	}
}

function move_down(e) {
	is_down = true;
	this_e = e;
	e.target.classList.add('posi')
	e.target.style.left = 'auto'
	e.target.style.top = 'auto'
}
function X_Y_IS(e,i){
	return (e.clientX > gu[i].offsetLeft && e.clientX < gu[i].offsetLeft + 200 &&
			e.clientY > gu[i].offsetTop && e.clientY < gu[i].offsetTop + 200)
}
document.onmousemove = function(e) {
	if(is_down) { //鼠标按下，进入条件
		this_e.target.style.left = e.clientX - 50 + 'px'
		this_e.target.style.top = e.clientY - 50 + 'px'
		if(X_Y_IS(e,0)) {
			this_e_2.item = 'a'
			is_posi = true;
		} else if(X_Y_IS(e,1)) {
			this_e_2.item = 'b'
			is_posi = true;
		} else { //若楼上两个条件都没进入则直接图片被拉到其他地方了
			is_posi = false;
		}
	}
}
document.onmouseup = function(e) {
	is_down = false;
	var is_item=null;
	if(X_Y_IS(e,0)) {
		is_item = 'a'
	} else if(X_Y_IS(e,1)) {
		is_item = 'b'
	}else{
		is_item=null
	}
	console.log(is_item)
	if(is_item == 'a' || is_item == 'b' ) {
		console.log(is_onclick,is_posi)
		if(is_posi && !is_onclick) {
			if(this_e_2[this_e_2.item] != '') { //判断是否为第一次拖动
				this_e_2[this_e_2.item].target.classList.remove('posi') //去除绝对定位，让原元素回到自己的老窝
				document.querySelector('#audio_auto1_' + this_e_2[this_e_2.item].target.classList[0].toString().replace('d_', '')).pause() //将原先那个元素的音乐暂停
				this_e_2[this_e_2.item] = this_e;
				this_e_2[this_e_2.item].target.classList.add('posi') //加上绝对定位，让原元素恢复翱翔的自由
				document.querySelector('#audio_auto1_' + this_e_2[this_e_2.item].target.classList[0].toString().replace('d_', '')).play() //播放新拖动上来的元素中对应的音频
			} else {
				this_e_2[this_e_2.item] = this_e;
				document.querySelector('#audio_auto1_' + this_e_2[this_e_2.item].target.classList[0].toString().replace('d_', '')).play()
			}
		} else {
			this_e.target.classList.remove('posi')
		}
	}else if(!is_onclick){
		this_e.target.classList.remove('posi')
	}

}
document.onmousedown=function(e){
	var is_item_=null;
	if(X_Y_IS(e,0)) {
		is_item_ = 'a'
	} else if(X_Y_IS(e,1)) {
		is_item_ = 'b'
	}
	if(is_item_!=null){
		is_onclick=true;
		this_e_2[is_item_].target.classList.remove('posi') //去除绝对定位，让原元素回到自己的老窝
		document.querySelector('#audio_auto1_' + this_e_2[is_item_].target.classList[0].toString().replace('d_', '')).pause() //将原先那个元素的音乐暂停
	}else{
		is_onclick=false;
	}
}