import { Component, OnInit,NgZone } from '@angular/core';
import { NavController,Platform, ToastController, ModalController, AlertController } from '@ionic/angular';
import { C } from './../providers/constants';
import { GlobalFunction } from './../providers/globalfunction';
import { Badge } from '@ionic-native/badge/ngx';
import { Storage } from '@ionic/storage';
import * as request from 'requestretry';
import * as moment from 'moment';
import { ValueGlobal } from '../providers/book-service';

/**
 * Generated class for the InboxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit{
  // items= [
  //   {id:1, title: 'Cập nhật trạng thái booking', message: 'iVIVU đã kiểm tra tình trạng phòng của Booking IVIVU123456 tại Swiss-Belresort Tuyền Lâm - Đà Lạt và đã gửi thông tin thanh toán cho Quý khách.',date: '1 giờ trước', status: 0},
  //   {id:2, title: 'Chia sẻ nhận xét về khách sạn', message: 'Quý khách hãy đánh giá khách sạn Imperial Vũng Tàu để nhận đến 10 điểm tích luỹ và giúp mọi người hiểu hơn về khách sạn nhé!',date: '12/10/2018', status: 1},
  //   {id:3, title: 'Chuẩn bị khởi hành đi Imperial Vũng Tàu', message: 'Xe sẽ khởi hành đi Imperial Vũng Tàu tại số 1 Lê Duẩn, Q1 - Cổng Thảo Cầm Viên lúc 10 giờ. Quý khách vui lòng có mặt tại điểm đón trước 20 phút',date: '10/10/2018', status: 1},
  //   {id:4, title: '6 điểm check-in giải nhiệt nắng hè đẹp tựa trời Tây ở Vũng Tàu', message: 'Những ngày đầu hè nắng nóng, bạn hãy tìm cho mình điểm đến giải nhiệt hiệu quả. Vũng Tàu là một trong những gợi ý phù hợp dành cho bạn.',date: '10/10/2018', status: 1},
  //   {id:5, title: 'Thay đổi thông tin chuyến bay', message: 'Booking IVIVU888888 có số hiệu chuyến bay BL678 thay đỗi sang (Số hiệu chuyến bay BL888, 10 giờ, thứ 6, ngày 02, tháng 07)',date: '01/10/2018', status: 1},

  // ]
  public items = [];
  public phone = '';
  public email = '';
  loaddatadone: boolean = false;
  public itemskeleton = [1,2,3,4,5,6,7,8,9,10];
  loadend: boolean;
  pageIndex: number = 1;
  pageSize = 10;
  constructor(public platform: Platform,public navCtrl: NavController,public gf: GlobalFunction,private badge: Badge,
    private storage: Storage,
    private zone: NgZone,
    public toastCtrl: ToastController,
    public valueGlobal: ValueGlobal,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController) {
    //google analytic
    gf.googleAnalytion('inbox','load','');
    //get phone
    this.storage.get('phone').then(data =>{
      if(data){
        this.phone = data;
      }
    })
    //get email
    this.storage.get('email').then(e =>{
      if(e){
        this.email = e;
      }
    })
  }

  ngOnInit(){

  }

  ionViewWillEnter() {
    this.gf.clearActivatedTab();
    if(document.querySelector(".tabbar")){
      document.querySelector(".tabbar")['style'].display = 'flex';
    }
    //19/07/2019: Load thông tin notification
    this.loadUserNotification();
  }

  async handleSplashScreen(): Promise<void> {
    try {
      // wait for App to finish loading
      await this.platform.ready()
    } catch (error) {
      if (error) {
        error.page = "inbox";
        error.func = "handleSplashScreen";
        C.writeErrorLog(error,null);
        throw new Error(error)
      };
    }
    const splash = document.getElementById('splash-screen');
    if (splash) {
      splash.style.opacity = '0';
      setTimeout(() => { splash.remove() }, 300);
    }

  }

  /**
     * Load thông báo của user
     */
    loadUserNotification(){
      var se = this;
      se.storage.get('auth_token').then(auth_token => {
          if (auth_token) {
              var text = "Bearer " + auth_token;
              var options = {
              method: 'GET',
              url: C.urls.baseUrl.urlMobile +'/mobile/OliviaApis/GetNotificationByUser?pageIndex='+se.pageIndex +'&pageSize=' + se.pageSize,
              timeout: 10000, maxAttempts: 5, retryDelay: 2000,
              headers:
              {
                  'cache-control': 'no-cache',
                  'content-type': 'application/json',
                  authorization: text
              }
              };
              request(options, function (error, response, body) {
              if (error) {
                  error.page = "inbox";
                  error.func = "loadUserNotification";
                  error.param =  JSON.stringify(options);
                  C.writeErrorLog(error,response);
              }else{
                  if(body && body != "[]"){
                      var data = JSON.parse(body);
                      se.zone.run(()=>{
                        if(data && data.length >0){
                          data.forEach(element =>{
                            let arrdate = moment(element.created).format('DD/MM/YYYY/HH/mm').split('/');
                            let d = new Date(Number(arrdate[2]), Number(arrdate[1])-1, Number(arrdate[0]),Number(arrdate[3]),Number(arrdate[4]));
                            let today = new Date();
                            if( moment(today).diff(d, 'hours') <= 24){
                              let diffhours = moment(today).diff(d, 'hours');
                              element.date = moment(today).diff(d, 'hours') + " giờ trước";
                              if(diffhours == 0){
                                element.date = moment(today).diff(d, 'minutes') + " phút trước";
                              }
                              
                            }else{
                              element.date = moment(element.created).format('DD/MM/YYYY');
                            }
                            element.deleted = false;
                            if(se.items.length >0){
                              if(!se.gf.checkExistsItemInArray(se.items,element, 'trip')){
                                se.items.push(element);
                              }
                            }else{
                              se.items.push(element);
                            }
                           
                          });
                           
                          //count số notifi
                          let countNoti = se.items.filter(item=>{ return !item.status }).length;
                          se.badge.set(countNoti);
                          se.valueGlobal.countNotifi = countNoti;
                           //sort lại notifi mới nhất lên trước
                          se.sortNotifi(se.items);
                          se.loaddatadone = true;
                          
                        }
                      
                        })
                       
                  }else{
                    se.zone.run(()=>{
                      
                      se.loadend = true;
                      se.loaddatadone = true;
                      if(se.pageIndex == 1){
                        se.items = [];
                        se.valueGlobal.countNotifi =0;
                      }
                    })
                  }
              }
              });
          }
          else{
            se.zone.run(()=>{
              se.items = [];
              se.valueGlobal.countNotifi= 0;
              se.loaddatadone = true;
            })
            se.refreshToken();
            //se.showConfirm("Phiên đăng nhập hết hạn. Xin vui lòng đăng nhập lại để sử dụng chức năng này.");
          }
      })
  }
  /**
   * Thực hiện sort theo date
   */
  sortNotifi(data) {
    var se = this;
    if (data && data.length > 0) {
      se.zone.run(() => data.sort(function (a, b) {
        let direction = -1;
          if (moment(a['created']).diff(moment(b['created']), 'minutes') <=0) {
            return -1 * direction;
          }
          else {
            return 1 * direction;
          }
      }));
    }
  };
  /**
   * Hàm set lại trạng thái thông báo
   */
  updateStatusMessage(item){
    var se = this;
    se.items.forEach(element => {
      if(element.id == item.id){
        se.zone.run(()=>{
          if(!element.status){
            element.status = 1;
            //update status xuống db
            se.callUpdateStatus(element);
          }
        })
      }
    });

    
    //chuyển qua tab mytrip
    if(item && item.bookingCode && item.notifyAction != "cancel"){
      if(item.notifyAction == "sharereviewofhotel"){
        se.navCtrl.navigateForward(['/app/tabs/tab3']);
        se.gf.setParams(item.bookingCode,'notifiBookingCode');
        se.gf.setParams(2,'selectedTab3');
      }
      else if(item.notifyType == "blog" && item.notifyAction == "blogofmytrip"){
        se.valueGlobal.backValue = "tab4";
        se.navCtrl.navigateForward("/blog/" + item.bookingCode);
      }
      else if(item.notifyType == "fly" && item.notifyAction == "flychangeinfo"){
        se.navCtrl.navigateForward(['/app/tabs/tab3']);
        se.gf.setParams(item.bookingCode,'notifiBookingCode');
        se.gf.setParams(item.switchObj,'notifiSwitchObj');
      }
      else{
        se.gf.setParams(item.bookingCode,'notifiBookingCode');
        se.navCtrl.navigateForward(['/app/tabs/tab3']);
      }
    }else{
      //show notifi
      se.presentToastNotifi(item.message);
    }
    
  }
  /**
   * Hàm update trạng thái đã đọc thông báo
   */
  callUpdateStatus(item){
    var se = this;
      se.storage.get('auth_token').then(auth_token => {
          if (auth_token) {
              var text = "Bearer " + auth_token;
              var options = {
              method: 'POST',
              url: C.urls.baseUrl.urlMobile +'/mobile/OliviaApis/UpdateStatusNotificationOfUser',
              timeout: 10000, maxAttempts: 5, retryDelay: 2000,
              headers:
              {
                  'cache-control': 'no-cache',
                  'content-type': 'application/json',
                  authorization: text
              },
              body: {
                "id": item.id,
                "phoneNumber": this.phone,
                "email": this.email,
                "memberId": auth_token,
                "switchTypeOf": item.switchTypeOf,
                "switchAction": item.switchAction,
                "switchObj": item.switchObj,
                "title": item.title,
                "message": item.message,
                "status": 1
              },
              json: true,
              };
              request(options, function (error, response, body) {
              if (error) {
                  error.page = "inbox";
                  error.func = "loadUserNotification";
                  error.param =  JSON.stringify(options);
                  C.writeErrorLog(error,response);
              }else if(body && body.success){
                 se.valueGlobal.countNotifi--;  
              }
              });
          }
      })
  }
 /**
   * Hàm xóa thông báo
   */
  deleteNotifi(item){
    var se = this;
    se.storage.get('auth_token').then(auth_token => {
        if (auth_token) {
            var text = "Bearer " + auth_token;
            var options = {
            method: 'POST',
            url: C.urls.baseUrl.urlMobile +'/mobile/OliviaApis/DeleteNotificationOfUser',
            timeout: 10000, maxAttempts: 5, retryDelay: 2000,
            headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: text
            },
            body: {
              "id": item.id,
              "phoneNumber": this.phone,
              "email": this.email,
              "memberId": auth_token,
              "switchTypeOf": item.switchTypeOf,
              "switchAction": item.switchAction,
              "switchObj": item.switchObj,
              "title": item.title,
              "message": item.message,
              "status": 1
            },
            json: true,
            };
            request(options, function (error, response, body) {
            if (error) {
                error.page = "inbox";
                error.func = "loadUserNotification";
                error.param =  JSON.stringify(options);
                C.writeErrorLog(error,response);
            }else if(body && body.success){
              se.zone.run(()=>{
                item.deleted = true;     
              })
            }
            });
        }
    })
  }

   /**
   * Hàm show cảnh báo
   */
  async presentToastNotifi(item) {
    const toast = await this.toastCtrl.create({
      message: item.message,
      duration: 3000,
      position: 'top',
    });
    toast.present();
  }

  public async showConfirm(msg){
    let alert = await this.alertCtrl.create({
      message: msg,
      cssClass: "cls-alert-showmore",
      buttons: [
      {
        text: 'Để sau',
        handler: () => {
          this.storage.remove('auth_token');
          this.storage.remove('email');
          this.storage.remove('username');
          this.storage.remove('jti');
          this.storage.remove('userInfoData');
          this.storage.remove('userRewardData');
          this.storage.remove('point');
          this.storage.remove('infocus');
          this.zone.run(()=>{
            this.valueGlobal.countNotifi = 0;
          })
          if(this.modalCtrl){
            this.modalCtrl.dismiss();
          }
          this.navCtrl.navigateBack('/');
        }
      },
      {
        text: 'Đăng nhập',
        role: 'OK',
        handler: () => {
          this.storage.remove('auth_token');
          this.storage.remove('email');
          this.storage.remove('username');
          this.storage.remove('jti');
          this.storage.remove('userInfoData');
          this.storage.remove('userRewardData');
          this.storage.remove('point');
          this.storage.remove('infocus');
          this.zone.run(()=>{
            this.valueGlobal.countNotifi = 0;
          })
          //this.valueGlobal.logingoback = "MainPage";
          if(this.modalCtrl){
            this.modalCtrl.dismiss();
          }
          this.navCtrl.navigateForward('/login');
        }
      }
    ]
    });
    alert.present();
  }

  doRefresh(event){
    var se = this;
    se.loadUserNotification();
     setTimeout(()=>{
      event.target.complete();
     }, 1500);
     
  }

  onSwipe(event){
    debugger
  }

  doInfinite(infiniteScroll) {
    this.zone.run(() => {
      this.pageIndex += 1;
      this.loadUserNotification();
      infiniteScroll.target.complete();
    })
  }

  refreshToken() {
    var se = this;
    se.storage.get('auth_token').then(auth_token => {
      if (auth_token) {
        var text = "Bearer " + auth_token;
        var options = {
          method: 'GET',
          url: C.urls.baseUrl.urlMobile + '/api/Account/reloadTokenClaims',
          headers:
          {
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            authorization: text
          },
        }
        request(options, function (error, response, body) {
          if (error) {
            error.page = "tab4";
            error.func = "refreshToken";
            error.param = JSON.stringify(options);
            C.writeErrorLog(error,response);
          } else {
            var json=JSON.parse(body);
            if (json.auth_token) {
              se.storage.remove('auth_token');
              se.storage.set("auth_token", json.auth_token);
              se.loadUserNotification();
            }
          }
        })
      }
    })
  }
}