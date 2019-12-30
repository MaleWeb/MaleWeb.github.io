export default {
    data() {
        return {
            cartList: [],
            startX: 0,//按下的位置
            delBtnWidth: 60,//删除按钮的宽度以及平移的宽度
        }
    },
    onShow() { //页面渲染就会触发
        this.cartList.forEach(e => {
            e.left = 0;
        })
        
        console.log(this.cartList)
    },
    methods: {
        touchS(e) {
            if (e.touches.length == 1) {
                this.startX = e.touches[0].clientX;
            }
        },
        touchM(e) {
            let index = e.currentTarget.dataset.index;
            if (e.touches.length == 1) {
                //手指滑动开始的位置记录
                let moveX = e.touches[0].clientX;
                let disX = this.startX - moveX;
                let left = 0;
                if (disX == 0 || disX < 0) { //如果移动距离小于等于0，位置不变
                    left = "0px";
                } else if (disX > 0) { //移动距离大于0，left值等于手指移动距离
                    left = "-" + disX + "px";
                    if (disX >= this.delBtnWidth) {
                        left = "-" + this.delBtnWidth + "px";
                    }
                }
                // console.log(left)
                if (index != "" && index != null) {
                    this.cartList[index].leftVal = left;
                }
            }
        },
        touchE(e) {
            let index = e.currentTarget.dataset.index;
            if (e.mp.changedTouches.length == 1) {
                //手指抬起的位置
                let endX = e.mp.changedTouches[0].clientX;
                let disX = this.startX - endX;
                let left = 0;
                //如果距离小于删除按钮的1/2，不显示删除按钮
                left = disX > this.delBtnWidth / 2 ? "-" + this.delBtnWidth + "px" : "0px";
                if (index !== "" && index != null) {
                    this.cartList[index].leftVal = left;
                }
            }
        },
    },
}
