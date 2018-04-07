  Vue.component("page",{
      template:"#page",
        data:function(){
          return{
            current:1,
            showItem:5,
            allpage:13
          }
        },
        computed:{
          pages:function(){
                var pag = [];
                  if( this.current < this.showItem ){ //如果当前的激活的项 小于要显示的条数
                       //总页数和要显示的条数那个大就显示多少条
                       var i = Math.min(this.showItem,this.allpage);
                       while(i){
                           pag.unshift(i--);
                       }
                   }else{ //当前页数大于显示页数了
                       var middle = this.current - Math.floor(this.showItem / 2 ),//从哪里开始
                           i = this.showItem;
                       if( middle >  (this.allpage - this.showItem)  ){
                           middle = (this.allpage - this.showItem) + 1
                       }
                       while(i--){
                           pag.push( middle++ );
                       }
                   }
                 return pag
               }
      },
      methods:{
        goto:function(index){
          if(index == this.current) return;
            this.current = index;
            //这里可以发送ajax请求
            var params = {};
            params.pk = 1;
            axios.get('api/get_object',{params:params})
                .then(function (response) {
                    var data = response.data;
                    vm.hasObject = '1';
                    vm.objects = data;
                    console.log(vm.objects);
                })
                    .catch(function (err) {
                        console.log("GGGGGGG");
                    })
        }
      }
    })

var vm = new Vue({
  el:'#app',
    data:{
      message: 'This is screen2!',
        styleObject: {
            display: 'none',
        },
        hasObject: '0',
        objects: [
            {
                model: "xxxx.xxxx",
                pk: 'x',
                fields: {
                    sex: "x",
                    sex_confidence: "x.xxxx",
                    upper_cloth_color: "xxxx",
                    upper_cloth_color_confidence: "x.xxxx",
                    down_cloth_color: "xxxx",
                    down_cloth_color_confidence: "x.xxxx",
                    camera_id: 'x'
                }
            },
        ],
    }
});
















var app2 = new Vue ({
    el: '#app2',
    data: {
        message: 'This is screen2!',
        styleObject: {
            display: 'none',
        },
        id: '',
        camera: 'x',
        date: '',
        dateStr: '',
        interval:'x',
        interval_time: '',
        hasObject: '0',
        objects: [

        ],

    },
    updated:function () {
        console.log("ssssfdfsf");
        var vm = this;

        // if(vm.$data.objects.length == 0){
        //     this.get_object();
        //     this.get_info();
        // }
    },
    watch:{
        //监听 id的变化
        id : function(newId, oldId) {
            this.get_object();
            this.get_info();
        }

    },
    methods:{
        get_object:function () {
            var vm = this;
            var pk = localStorage.getItem('video');
            var params = {};
            params.pk = pk;
            axios.get('api/get_object',{params:params})
                .then(function (response) {

                    var data = response.data;


                })
                    .catch(function (err) {
                        console.log("GGGGGGG");
                    })
        },
        get_info:function () {
            var vm = this;
            var pk = localStorage.getItem('video');
            var params = {};
            params.pk = pk;
            axios.get('api/get_info',{params:params})
                .then(function (response) {
                    var data = response.data[0];
                    vm.id = data.pk;
                    vm.camera = data.fields.camera;

                    vm.date = data.fields.create_date;
                    vm.dateStr = data.fields.create_date.replace(/\-/g, "");
                    vm.interval = data.fields.interval;
                    var interval_time = ""; console.log(vm.date);
                    switch (vm.interval)
                    {
                        case "0":
                            interval_time = "00:00-02:00";
                            break;
                        case "1":
                            interval_time = "02:00-04:00";
                            break;
                        case "2":
                            interval_time = "04:00-06:00";
                            break;
                        case "3":
                            interval_time = "06:00-08:00";
                            break;
                        case "4":
                            interval_time = "08:00-10:00";
                            break;
                        case "5":
                            interval_time = "10:00-12:00";
                            break;
                        case "6":
                            interval_time = "12:00-14:00";
                            break;
                        case "7":
                            interval_time = "14:00-16:00";
                            break;
                        case "8":
                            interval_time = "16:00-18:00";
                            break;
                        case "9":
                            interval_time = "18:00-20:00";
                            break;
                        case "10":
                            interval_time = "20:00-22:00";
                            break;
                        case "11":
                            interval_time = "22:00-24:00";
                            break;
                    }
                    vm.interval_time = interval_time;
                })
                    .catch(function (err) {
                        console.log("GGGGGGG11");
                    })
        },
        return_0:function () {
            var vm = this;
            vm.hasObject = '0';
            localStorage.setItem("status", 0);
            localStorage.setItem("video", '')
            window.app.$data.styleObject.display = 'block';
            window.app2.$data.styleObject.display = 'none';

        },
    }
});





