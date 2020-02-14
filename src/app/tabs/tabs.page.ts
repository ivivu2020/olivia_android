import { Booking, ValueGlobal } from './../providers/book-service';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Platform, IonTabBar, ActionSheetController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SearchHotel } from 'src/app/providers/book-service';
import { NavController } from '@ionic/angular';
import { C } from './../providers/constants';
import { GlobalFunction } from './../providers/globalfunction';
import * as $ from 'jquery';
import { Badge } from '@ionic-native/badge/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import * as request from 'requestretry';
import { Storage } from '@ionic/storage';
import { NetworkProvider } from '../network-provider.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Market } from '@ionic-native/market/ngx';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  @ViewChild(IonTabBar) tabBar: IonTabBar;
  countmessage = 0;
  intervalNoti;
  phone: any;
  email: any;
  appversion: any;
  countclaim: any;
  username: any;
  constructor(public platform: Platform, private router: Router, private activeRoute: ActivatedRoute, private modalCtrl: ModalController,
    public searchhotel: SearchHotel, private navCtrl: NavController, public gf: GlobalFunction, public booking: Booking, private badge: Badge, private fcm: FCM,
    private storage: Storage,
    private zone: NgZone,
    public valueGlobal: ValueGlobal,
    private networkProvider: NetworkProvider,
    private actionSheetCtrl: ActionSheetController,
    private toastCrl: ToastController,
    private appVersion: AppVersion,
    private market: Market) { }

  ngOnInit() {
    this.storage.get('phone').then(data => {
      if (data) {
        this.phone = data;
      }
    })
    //get email
    this.storage.get('email').then(e => {
      if (e) {
        this.email = e;
      }
    })
    //get username
    this.storage.get('username').then(username => {
      if (username) {
        this.username = username;
      }
    })
    //Lấy app version
    this.appVersion.getVersionNumber().then(version => {
      this.appversion = version;
    })

    //Xử lý nút back của dt
    try {
      this.platform.ready().then(() => {
        document.addEventListener("backbutton", async () => {
          if (this.router.url.indexOf("tab1") != -1) {
            const element = await this.modalCtrl.getTop();
            if (element) {
              element.dismiss();
            } else {
              navigator['app'].exitApp();
            }
          } else {
            if (this.router.url.indexOf("hotellist") != -1 || this.router.url.indexOf("searchhotel") != -1) {
              this.navCtrl.navigateBack('/');
            }    
            //popupinfobkg
            else if (this.router.url.indexOf("popupinfobkg") != -1) {
              this.navCtrl.back();
            }
            else if (this.router.url.indexOf("bloglist") != -1) {
              this.navCtrl.navigateBack('/');
            }
            else if (this.router.url.indexOf("flightcomboadddetails") != -1) {
              this.navCtrl.back();
            }
            else if (this.router.url.indexOf("login") != -1) {
              if(this.valueGlobal.backValue = 'tab5'){
                this.navCtrl.navigateBack(['/app/tab/tab5']);
              }else{
                this.navCtrl.back();
              }
            }
            else if (this.router.url.indexOf("comboadddetails") != -1) {
              this.navCtrl.back();
            }
            else if (this.router.url.indexOf("combocarbank") != -1) {
              this.navCtrl.back();
            }
            else if (this.router.url.indexOf("combocarlive") != -1) {
              this.navCtrl.back();
            }
            else if (this.router.url.indexOf("combopayment") != -1) {
              this.navCtrl.back();
            }
            else if (this.router.url.indexOf("blog") != -1) {
              if (this.searchhotel.backPage == "bloglist") {
                this.navCtrl.navigateBack('bloglist');
              }
              else {
                this.navCtrl.navigateBack('/');
              }
            }
            else if (this.router.url.indexOf("flightcomboreviews") != -1) {
              const element = await this.modalCtrl.getTop();
              if (element) {
                element.dismiss();
              } else {
                //this.navCtrl.navigateBack('/hoteldetail/' + this.booking.HotelId);
                this.navCtrl.navigateBack('/hoteldetail/' + this.booking.HotelId);
              }
            }
            else if (this.router.url.indexOf("carcombo") != -1) {
              const element = await this.modalCtrl.getTop();
              if (element) {
                element.dismiss();
              } else {
                //this.navCtrl.navigateBack('/hoteldetail/' + this.booking.HotelId);
                this.navCtrl.navigateBack('/hoteldetail/' + this.booking.HotelId);
              }
            }
            else if (this.router.url.indexOf("flightcombopaymentdone") != -1) {
              this.navCtrl.navigateBack('/');
            }
            else if (this.router.url.indexOf("blog") != -1) {
              this.navCtrl.navigateBack('/');
            }
            else if (this.router.url.indexOf("roompaymentdone") != -1) {
              this.navCtrl.navigateBack('/');

            }
            else if (this.router.url.indexOf("roompaymentdoneean") != -1) {
              this.navCtrl.navigateBack('/');

            }
            else if (this.router.url.indexOf("hoteldetail") != -1) {
              const element = await this.modalCtrl.getTop();
              if (element) {
                element.dismiss();
              } else {
                if (this.searchhotel.rootPage == "mainpage" || this.searchhotel.rootPage == "topdeal" || this.searchhotel.rootPage == "roompaymentselect-ean" || this.searchhotel.rootPage == "roomchoosebank") {
                  this.navCtrl.navigateBack('/');
                }
                else if (this.searchhotel.rootPage == "likepage") {
                  this.navCtrl.navigateBack(['/app/tabs/tab2']);
                  return;
                }
                else {

                  if (this.searchhotel.rootPage == "listpage") {
                    this.navCtrl.navigateBack('/hotellist/false');
                    //this.navCtrl.navigateBack(['/app/tabs/hotellist/false']);
                  }
                  else if (this.searchhotel.rootPage == "combolist") {
                    this.navCtrl.navigateBack('/combolist');
                  }
                  else if (this.searchhotel.rootPage == "topdeallist") {
                    this.navCtrl.navigateBack('/topdeallist');
                  }
                  else if (this.searchhotel.rootPage == "listmood") {
                    let hotellistmoodparams = this.gf.getParams('hotellistmood')
                    if (hotellistmoodparams) {
                      //this.navCtrl.navigateBack('/hotellistmood/' + hotellistmoodparams.moodid + '/' + hotellistmoodparams.title);
                      this.navCtrl.navigateBack('/hotellistmood/' + hotellistmoodparams.moodid + '/' + hotellistmoodparams.title);
                    } else {
                      this.navCtrl.back();
                    }

                  } else {
                    console.log(this.searchhotel.rootPage + '_' + element ? 'true' : 'false');
                    this.navCtrl.navigateBack('/');
                  }
                }
              }
            } else if (this.router.url.indexOf("hotelreviews") != -1
              || this.router.url.indexOf("hoteldescription") != -1
              || this.router.url.indexOf("policy") != -1
              || this.router.url.indexOf("facilities") != -1
              || this.router.url.indexOf("hotelroomdetail") != -1
              || this.router.url.indexOf("occupancy") != -1) {
              this.navCtrl.back();
            }
            else if (this.router.url.indexOf("hotelreviews") != -1
            || this.router.url.indexOf("hoteldescription") != -1
            || this.router.url.indexOf("policy") != -1
            || this.router.url.indexOf("facilities") != -1
            || this.router.url.indexOf("hotelroomdetail") != -1
            || this.router.url.indexOf("occupancy") != -1 ||  this.router.url.indexOf("loginusername") != -1 || this.router.url.indexOf("register") != -1){
              this.navCtrl.back();
            }
            else if (this.router.url.indexOf("mytripbookingdetail") != -1) {
              this.navCtrl.navigateBack(['/app/tabs/tab3/']);

            }
            else if (this.router.url.indexOf("tripweather") != -1
              || this.router.url.indexOf("hotelnotes") != -1
              || this.router.url.indexOf("hotelexpsnotes") != -1
              || this.router.url.indexOf("tripweather") != -1
            ) {
              this.navCtrl.back();

            } else if (this.router.url.indexOf("tab2") != -1
              || this.router.url.indexOf("tab3") != -1
              || this.router.url.indexOf("tab4") != -1
              || this.router.url.indexOf("tab5") != -1) {
              this.navCtrl.navigateBack('/');
            } else if (this.router.url.indexOf("roomadddetails") != -1) {
              this.navCtrl.navigateBack('roomdetailreview');

            }
            else if (this.router.url.indexOf("tab2") != -1
              || this.router.url.indexOf("tab3") != -1
              || this.router.url.indexOf("tab4") != -1
              || this.router.url.indexOf("tab5") != -1) {
              this.navCtrl.navigateBack(['/app/tabs/tab1']);
            }
            else if (this.router.url.indexOf("userprofile") != -1
              || this.router.url.indexOf("userreviews") != -1
              || this.router.url.indexOf("userreward") != -1
              || this.router.url.indexOf("cuspoints") != -1
              || this.router.url.indexOf("usertravelhobby") != -1) {
              this.navCtrl.navigateBack(['app/tabs/tab5']);
            }
            else if (this.router.url.indexOf("roomadddetails-ean") != -1) {
              this.navCtrl.navigateBack('roomdetailreview');

            }
            else if (this.router.url.indexOf("roompaymentselect") != -1) {
              if (this.searchhotel.backPage == "roompaymentselect-ean") {
                this.navCtrl.navigateBack('roomadddetails-ean');

              } else {
                this.navCtrl.navigateBack('roomadddetails');

              }

            }
            else if (this.router.url.indexOf("roompaymentlive") != -1) {
              if (this.searchhotel.backPage == "roompaymentselect-ean") {
                this.navCtrl.navigateBack('roompaymentselect-ean');

              } else {
                this.navCtrl.navigateBack('roompaymentselect');

              }
            }

            else if (this.router.url.indexOf("roompaymentbank") != -1) {
              if (this.searchhotel.backPage == "roompaymentselect-ean") {
                this.navCtrl.navigateBack('roompaymentselect-ean');

              } else {
                this.navCtrl.navigateBack('roompaymentselect');

              }
            }

            else if (this.router.url.indexOf("roompaymentatm") != -1) {
              if (this.searchhotel.backPage == "roompaymentselect-ean") {
                this.navCtrl.navigateBack('roompaymentselect-ean');

              } else {
                this.navCtrl.navigateBack('roompaymentselect');

              }
            }

            else if (this.router.url.indexOf("roomdetailreview") != -1) {
              //this.navCtrl.navigateBack('/hoteldetail/' + this.booking.HotelId);
              //this.navCtrl.navigateBack(['/hoteldetail/'+ this.booking.HotelId]);
              if (this.valueGlobal.backValue == 'hotelroomdetail') {
                this.navCtrl.navigateBack('/hotelroomdetail/' + this.booking.HotelId);
              } else {
                this.navCtrl.navigateBack('/hoteldetail/' + this.booking.HotelId);
              }
            }
            else if (this.router.url.indexOf("onepay") != -1) {
              //this.navCtrl.navigateBack('/hoteldetail/' + this.booking.HotelId);
              this.navCtrl.navigateBack('/hoteldetail/' + this.booking.HotelId);
            }
            else if (this.router.url.indexOf('roomcancel') != -1) {
              if (this.searchhotel.backPage == "roomdetailreview") {
                this.navCtrl.navigateBack('/roomdetailreview');

              } else if (this.searchhotel.backPage == "roompaymentselect") {
                this.navCtrl.navigateBack('/roompaymentselect');

              }
              else if (this.searchhotel.backPage == "roompaymentselect-ean") {
                this.navCtrl.navigateBack('/roompaymentselect-ean');

              } else if (this.searchhotel.backPage = "mytripbookingdetail") {
                this.navCtrl.navigateBack('/mytripbookingdetail');
              }
            }
            else if (this.router.url.indexOf("roompaymentbreakdow") != -1) {
              if (this.searchhotel.backPage == "roomdetailreview") {
                this.navCtrl.navigateBack('/roomdetailreview');

              } else if (this.searchhotel.backPage == "roompaymentselect") {
                this.navCtrl.navigateBack('/roompaymentselect');

              }
              else if (this.searchhotel.backPage == "roompaymentselect-ean") {
                this.navCtrl.navigateBack('/roompaymentselect-ean');

              }
            }

            else if (this.router.url.indexOf("topdeallist") != -1) {
              this.navCtrl.navigateBack('/');
            }
            else if (this.router.url.indexOf("experiencesearch") != -1) {
              const element = await this.modalCtrl.getTop();
              if (element) {
                element.dismiss();
              } else {
                this.navCtrl.navigateBack('/');
              }

            }
            else if (this.router.url.indexOf("searchexperienceregion") != -1) {
              this.navCtrl.navigateBack('/experiencesearch');
            }
            else {
              this.navCtrl.navigateBack('/');
            }
          }
        })
      })
    }
    catch (error) {
      error.page = "tabspage";
      error.func = "handleBackButton";
      error.param = this.router.url;
      C.writeErrorLog(error, null);
    }
  }

  async clickedElement(e: any) {
    var obj: any = e.currentTarget;
    var items = $(obj).siblings('ion-tab-button');
    if (items && items.length > 0) {
      for (let index = 0; index < items.length; index++) {
        const element = items[index];
        $(element).attr('aria-selected', 'false');
      }
    }
    //Count noti
    if (obj.id != "tab-button-tab4") {
      this.loadUserNotification();
    }
    //Ẩn statusbar
    if (obj.id != "tab-button-tab1") {
      var se = this;
      let el = document.getElementsByClassName('div-statusbar-float');
      el[0].classList.remove('float-statusbar-enabled');
      el[0].classList.add('float-statusbar-disabled');
    }
    //Count claim
      setTimeout(()=>{
        this.countClaim();
      },5000)
  }

  countClaim(){
    this.zone.run(() => {
      this.countclaim = this.valueGlobal.countclaim;
    })
  }

  ionViewWillLeave() {
    this.zone.run(() => {
      clearInterval(this.intervalNoti);
    })
  }

  showNotification(data) {
    //chuyển qua tab mytrip
    if (data && data.BookingCode && data.notifyAction != "cancel") {
      if (data.notifyAction == "sharereviewofhotel") {
        this.navCtrl.navigateForward(['/app/tabs/tab3']);
        this.gf.setParams(data.BookingCode, 'notifiBookingCode');
        this.gf.setParams(2, 'selectedTab3');
      }
      else if (data.NotifyType == "blog" && data.notifyAction == "blogofmytrip") {
        this.valueGlobal.backValue = "tab4";
        this.navCtrl.navigateForward("/blog/" + data.BookingCode);
      }
      else if (data.NotifyType == "fly" && data.notifyAction == "flychangeinfo") {
        this.navCtrl.navigateForward(['/app/tabs/tab3']);
        this.gf.setParams(data.BookingCode, 'notifiBookingCode');
        this.gf.setParams(data.switchObj, 'notifiSwitchObj');
      }
      else {
        this.gf.setParams(data.BookingCode, 'notifiBookingCode');
        this.navCtrl.navigateForward(['/app/tabs/tab3']);
      }
    } else {
      //show notifi
      //this.showToast(data.message);
      if (data.updateNewVersion) {
        this.gotoPlayStore();
      } 
      else if (data.customParamNoti) {
        let msg ='';
        msg = data.message;
        if(msg.indexOf('@param1') != -1){
          msg.replace('@param1', data.param1);
        }
        if(msg.indexOf('@param2') != -1){
          msg.replace('@param2', data.param2);
        }
        if(msg.indexOf('@param3') != -1){
          msg.replace('@param3', data.param3);
        }
        if(msg.indexOf('@param4') != -1){
          msg.replace('@param4', data.param4);
        }
        if(msg.indexOf('@param5') != -1){
          msg.replace('@param5', data.param5);
        }
        if(msg.indexOf('@param6') != -1){
          msg.replace('@param6', data.param6);
        }
        if(msg.indexOf('@param7') != -1){
          msg.replace('@param7', data.param7);
        }
        if(msg.indexOf('@param8') != -1){
          msg.replace('@param8', data.param8);
        }
        if(msg.indexOf('@param9') != -1){
          msg.replace('@param9', data.param9);
        }
        if(msg.indexOf('@param10') != -1){
          msg.replace('@param10', data.param10);
        }
        if(msg.indexOf('Chúc') != -1){
          msg.replace('Chúc Quý Khách Hàng', 'Chúc '+ this.username);
        }
        this.showToast(msg);
      } 
      else if(data.dataLink){
        this.router.navigateByUrl(data.dataLink);
      }
      else {
        this.showToast(data.message);
      }
    }
    this.loadNotificationAndUpdateState(data.BookingCode)
  }

  async showActionSheetNoti(data) {
    var se = this;
    var iconStr = 'ic_home';
    var subClass = '';
    if (data.NotifyType == 'bookingbegoingcombotransfer') {
      iconStr = 'ic_bus2';
    } else if (data.NotifyType == 'blog' || data.notifyAction == 'blogofmytrip') {
      iconStr = 'ic_message';
    }
    else if (data.notifyAction == 'bookingbegoingcombofly' || data.notifyAction == 'flychangeinfo') {
      iconStr = 'ic_paper';
    }
    if (data.notifyAction == 'waitingconfirmtopayment') {
      subClass = 'fixheight-90';
    }

    if (data.notifyAction == 'cancel') {
      subClass = 'fixheight-76';
    }
    if (data.notifyAction == 'flychangeinfo' || data.notifyAction == 'blogofmytrip') {
      subClass = 'fixheight-36';
    }

    var msg = data.message;
    if (data.customParamNoti) {
      if(msg.indexOf('@param1') != -1){
        msg = msg.replace('@param1', data.param1);
      }
      if(msg.indexOf('@param2') != -1){
        msg = msg.replace('@param2', data.param2);
      }
      if(msg.indexOf('@param3') != -1){
        msg = msg.replace('@param3', data.param3);
      }
      if(msg.indexOf('@param4') != -1){
        msg = msg.replace('@param4', data.param4);
      }
      if(msg.indexOf('@param5') != -1){
        msg = msg.replace('@param5', data.param5);
      }
      if(msg.indexOf('@param6') != -1){
        msg = msg.replace('@param6', data.param6);
      }
      if(msg.indexOf('@param7') != -1){
        msg = msg.replace('@param7', data.param7);
      }
      if(msg.indexOf('@param8') != -1){
        msg = msg.replace('@param8', data.param8);
      }
      if(msg.indexOf('@param9') != -1){
        msg = msg.replace('@param9', data.param9);
      }
      if(msg.indexOf('@param10') != -1){
        msg = msg.replace('@param10', data.param10);
      }
      if(msg.indexOf('Chúc') != -1){
        msg = msg.replace('Chúc Quý Khách Hàng', 'Chúc '+ this.username);
      }
      subClass = 'fixheight-44';
      if(data.height){
        subClass = 'fixheight-'+data.height;
      }
    }
    else if(data.dataLink){
      this.router.navigateByUrl(data.dataLink);
    }

    let actionSheet = await se.actionSheetCtrl.create({
      cssClass: 'action-sheets-notification ' + iconStr + ' ' + subClass,
      header: data.title,
      animated: true,
      backdropDismiss: true,
      buttons: [
        {
          text: msg,
          handler: () => {
            se.showNotification(data);
          }
        }
      ]
    });
    actionSheet.present();
    setTimeout(() => {
      actionSheet.dismiss();
    }, 5000)
  }

  async showToast(msg) {
    let toast = await this.toastCrl.create({
      message: msg,
      position: 'top',
      duration: 5000
    })

    toast.present();
  }

  /**
     * Load thông báo của user
     */
  loadNotificationAndUpdateState(bookingCode) {
    var se = this;

    if (!this.networkProvider.isOnline()) {
      this.gf.showWarning('Không có kết nối mạng', 'Vui lòng kết nối mạng để sử dụng các tính năng của ứng dụng', 'Đóng');
      return;
    }
    se.storage.get('auth_token').then(auth_token => {
      if (auth_token) {
        var text = "Bearer " + auth_token;
        var options = {
          method: 'GET',
          url: C.urls.baseUrl.urlMobile + '/mobile/OliviaApis/GetNotificationByUser',
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
            error.param = JSON.stringify(options);
            C.writeErrorLog(error, response);
          } else {
            if (body && body != "[]") {
              var data = JSON.parse(body);
              if (data && data.length > 0) {
                console.log(data);
                data.forEach(element => {
                  if (element.bookingCode == bookingCode) {
                    se.callUpdateStatus(element);
                  }
                });
              }
            }
          }
        });
      }
    })
  }

  /**
   * Hàm update trạng thái đã đọc thông báo
   */
  callUpdateStatus(item) {
    var se = this;
    se.storage.get('auth_token').then(auth_token => {
      if (auth_token) {
        var text = "Bearer " + auth_token;
        var options = {
          method: 'POST',
          url: C.urls.baseUrl.urlMobile + '/mobile/OliviaApis/UpdateStatusNotificationOfUser',
          timeout: 10000, maxAttempts: 5, retryDelay: 2000,
          headers:
          {
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            authorization: text
          },
          body: {
            "id": item.id,
            "phoneNumber": se.phone,
            "email": se.email,
            "memberId": auth_token,
            "switchTypeOf": item.NotifyType,
            "switchAction": item.notifyAction,
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
            error.param = JSON.stringify(options);
            C.writeErrorLog(error, response);
          } else {
            se.loadUserNotification();
          }

        });
      }
    })
  }

  ionViewWillEnter() {
    //Count noti
    this.loadUserNotification();
    //count claim
    setTimeout(()=>{
      this.countClaim();
    },5000)

    var el = document.getElementsByClassName('tab-button');
    $('.tab-button').click(e => this.clickedElement(e));
    //Xử lý nút back của dt
    this.platform.ready().then(() => {
      //PDANH 19/07/2019: Push memberid & devicetoken
      this.storage.get('auth_token').then(auth_token => {
        if (auth_token) {
          //Notification
          this.fcm.onNotification().subscribe((data: any) => {
            if (data.wasTapped) {
              setTimeout(() => {
                this.showNotification(data);
                //update lại trạng thái bkg
                this.loadNotificationAndUpdateState(data.BookingCode);
              }, 3000)
            } else {
              //console.log("Received in foreground");
              this.zone.run(() => {
                this.countmessage++;
                this.valueGlobal.countNotifi++;
                this.badge.set(this.countmessage);
              })
              this.showActionSheetNoti(data);
            };

            this.fcm.onTokenRefresh().subscribe(token => {
              //PDANH 19/07/2019: Push memberid & devicetoken
              if (auth_token) {
                this.gf.pushTokenAndMemberID(auth_token, token, this.appversion);
              }
            })
          })
        }
      })

      document.addEventListener("backbutton", async () => {
        if (this.router.url.indexOf("tab1") != -1) {
          const element = await this.modalCtrl.getTop();
          if (element) {
            element.dismiss();
          } else {
            navigator['app'].exitApp();
          }
        } else {
          if (this.router.url.indexOf("hotellist") != -1 || this.router.url.indexOf("searchhotel") != -1) {
            this.searchhotel.arrlocalcheck = [];
            this.navCtrl.navigateBack('/');

          }
          
          else if (this.router.url.indexOf("bloglist") != -1) {
            this.navCtrl.navigateBack('/');
          }
          else if (this.router.url.indexOf("roompaymentdone") != -1) {
            this.navCtrl.navigateBack('/');

          }
          else if (this.router.url.indexOf("roompaymentdoneean") != -1) {
            this.navCtrl.navigateBack('/');

          }
          else if (this.router.url.indexOf("login") != -1) {
            if(this.valueGlobal.backValue = 'tab5'){
              this.navCtrl.navigateBack(['/app/tab/tab5']);
            }else{
              this.navCtrl.back();
            }
            
          }
          else if (this.router.url.indexOf("hoteldetail") != -1) {

            const element = await this.modalCtrl.getTop();
            if (element) {
              element.dismiss();
            } else {
              if (this.searchhotel.rootPage == "mainpage" || this.searchhotel.rootPage == "topdeal") {
                this.navCtrl.navigateBack('/');
              }
              else if (this.searchhotel.rootPage == "likepage") {
                this.navCtrl.navigateBack(['/app/tabs/tab2/']);
              }

              else {
                if (this.searchhotel.rootPage == "listpage") {
                  //this.navCtrl.navigateBack(['/app/tabs/hotellist/false']);
                  this.navCtrl.navigateBack('/hotellist/false');
                } else if (this.searchhotel.rootPage == "combolist") {
                  this.navCtrl.navigateBack('/combolist');
                } else if (this.searchhotel.rootPage == "topdeallist") {
                  this.navCtrl.navigateBack('/topdeallist');
                } else if (this.searchhotel.rootPage == "listmood") {
                  let hotellistmoodparams = this.gf.getParams('hotellistmood')
                  if (hotellistmoodparams) {
                    //this.navCtrl.navigateBack('/hotellistmood/' + hotellistmoodparams.moodid + '/' + hotellistmoodparams.title);
                    this.navCtrl.navigateBack('/hotellistmood/' + hotellistmoodparams.moodid + '/' + hotellistmoodparams.title);
                  } else {
                    this.navCtrl.back();
                  }

                } else {
                  console.log(this.searchhotel.rootPage + '_' + element ? 'true' : 'false');
                  this.navCtrl.navigateBack('/');
                }
              }
            }
          } else if (this.router.url.indexOf("hotelreviews") != -1
            || this.router.url.indexOf("hoteldescription") != -1
            || this.router.url.indexOf("policy") != -1
            || this.router.url.indexOf("facilities") != -1
            || this.router.url.indexOf("hotelroomdetail") != -1
            || this.router.url.indexOf("occupancy") != -1 || this.router.url.indexOf("loginusername") != -1|| this.router.url.indexOf("register") != -1){
              this.navCtrl.back();

          }
          else if (this.router.url.indexOf("mytripbookingdetail") != -1) {
            this.navCtrl.navigateBack(['/app/tabs/tab3/']);
          }
          else if (this.router.url.indexOf("tripweather") != -1
            || this.router.url.indexOf("hotelnotes") != -1
            || this.router.url.indexOf("hotelexpsnotes") != -1
            || this.router.url.indexOf("tripweather") != -1
          ) {
            this.navCtrl.back();

          } else if (this.router.url.indexOf("tab2") != -1
            || this.router.url.indexOf("tab3") != -1
            || this.router.url.indexOf("tab4") != -1
            || this.router.url.indexOf("tab5") != -1) {
            this.navCtrl.navigateBack('/');
          } else if (this.router.url.indexOf("roomadddetails") != -1) {
            this.navCtrl.navigateBack('roomdetailreview');
          }
          else if (this.router.url.indexOf("userprofile") != -1
            || this.router.url.indexOf("userreviews") != -1
            || this.router.url.indexOf("userreward") != -1
            || this.router.url.indexOf("cuspoints") != -1
            || this.router.url.indexOf("usertravelhobby") != -1) {
            this.navCtrl.navigateBack(['app/tabs/tab5/']);
          }

          else if (this.router.url.indexOf("roomadddetails-ean") != -1) {
            this.navCtrl.navigateBack('roomdetailreview');

          }
          else if (this.router.url.indexOf("roompaymentselect") != -1) {
            if (this.searchhotel.backPage == "roompaymentselect-ean") {
              this.navCtrl.navigateBack('roomadddetails-ean');

            } else {
              this.navCtrl.navigateBack('roomadddetails');

            }

          }
          else if (this.router.url.indexOf("roompaymentlive") != -1) {
            if (this.searchhotel.backPage == "roompaymentselect-ean") {
              this.navCtrl.navigateBack('roompaymentselect-ean');

            } else {
              this.navCtrl.navigateBack('roompaymentselect');

            }
          }
          else if (this.router.url.indexOf("flightcomboreviews") != -1) {
            const element = await this.modalCtrl.getTop();
            if (element) {
              element.dismiss();
            } else {
              //this.navCtrl.navigateBack('/hoteldetail/' + this.booking.HotelId);
              this.navCtrl.navigateBack('/hoteldetail/' + this.booking.HotelId);
            }
          }
          else if (this.router.url.indexOf("carcombo") != -1) {
            const element = await this.modalCtrl.getTop();
            if (element) {
              element.dismiss();
            } else {
              //this.navCtrl.navigateBack('/hoteldetail/' + this.booking.HotelId);
              this.navCtrl.navigateBack('/hoteldetail/' + this.booking.HotelId);
            }
          }
          else if (this.router.url.indexOf("flightcomboadddetails") != -1) {
            this.navCtrl.back();
          }
          else if (this.router.url.indexOf("comboadddetails") != -1) {
            this.navCtrl.back();
          }
          //popupinfobkg
          // else if (this.router.url.indexOf("popupinfobkg") != -1) {
          //       this.navCtrl.back();
          // }
          else if (this.router.url.indexOf("combocarbank") != -1) {
            this.navCtrl.back();
          }
          else if (this.router.url.indexOf("combocarlive") != -1) {
            this.navCtrl.back();
          }
          else if (this.router.url.indexOf("combopayment") != -1) {
            this.navCtrl.back();
          }
          else if (this.router.url.indexOf("flightcombopaymentdone") != -1) {
            this.navCtrl.navigateBack('/');
          }
          else if (this.router.url.indexOf("roompaymentbank") != -1) {
            if (this.searchhotel.backPage == "roompaymentselect-ean") {
              this.navCtrl.navigateBack('roompaymentselect-ean');

            } else {
              this.navCtrl.navigateBack('roompaymentselect');

            }
          }

          else if (this.router.url.indexOf("roompaymentatm") != -1) {
            if (this.searchhotel.backPage == "roompaymentselect-ean") {
              this.navCtrl.navigateBack('roompaymentselect-ean');

            } else {
              this.navCtrl.navigateBack('roompaymentselect');

            }
          }

          else if (this.router.url.indexOf("roomdetailreview") != -1) {
            //this.navCtrl.navigateBack('/hoteldetail/' + this.booking.HotelId);
            //this.navCtrl.navigateBack(['/hoteldetail/'+ this.booking.HotelId]);
            if (this.valueGlobal.backValue == 'hotelroomdetail') {
              this.navCtrl.navigateBack('/hotelroomdetail/' + this.booking.HotelId);
            } else {
              this.navCtrl.navigateBack('/hoteldetail/' + this.booking.HotelId);
            }
          }
          else if (this.router.url.indexOf("onepay") != -1) {
            //this.navCtrl.navigateBack('/hoteldetail/' + this.booking.HotelId);
            this.navCtrl.navigateBack('/hoteldetail/' + this.booking.HotelId);
          }
          else if (this.router.url.indexOf('roomcancel') != -1) {
            if (this.searchhotel.backPage == "roomdetailreview") {
              this.navCtrl.navigateBack('/roomdetailreview');

            } else if (this.searchhotel.backPage == "roompaymentselect") {
              this.navCtrl.navigateBack('/roompaymentselect');

            }
            else if (this.searchhotel.backPage == "roompaymentselect-ean") {
              this.navCtrl.navigateBack('/roompaymentselect-ean');

            } else if (this.searchhotel.backPage = "mytripbookingdetail") {
              this.navCtrl.navigateBack('/mytripbookingdetail');
            }
          }
          else if (this.router.url.indexOf("roompaymentbreakdow") != -1) {
            if (this.searchhotel.backPage == "roomdetailreview") {
              this.navCtrl.navigateBack('/roomdetailreview');

            } else if (this.searchhotel.backPage == "roompaymentselect") {
              this.navCtrl.navigateBack('/roompaymentselect');

            }
            else if (this.searchhotel.backPage == "roompaymentselect-ean") {
              this.navCtrl.navigateBack('/roompaymentselect-ean');

            }
          }
          else if (this.router.url.indexOf("topdeallist") != -1) {
            this.navCtrl.navigateBack('/');
          }
          else if (this.router.url.indexOf("experiencesearch") != -1) {
            const element = await this.modalCtrl.getTop();
            if (element) {
              element.dismiss();
            } else {
              this.navCtrl.navigateBack('/');
            }

          }
          else if (this.router.url.indexOf("searchexperienceregion") != -1) {
            this.navCtrl.navigateBack('/experiencesearch');
          }
          // else if(this.router.url.indexOf('login')!= -1){
          //   this.navCtrl.back();
          // }
          else {
            this.navCtrl.navigateBack('/');
          }

        }

      })
    })
    //gọi refresh token
    //this.refreshToken();
  }

  /**
     * Load thông báo của user
     */
  loadUserNotification() {
    var se = this;
    se.storage.get('auth_token').then(auth_token => {
      if (auth_token) {
        var text = "Bearer " + auth_token;
        var options = {
          method: 'GET',
          url: C.urls.baseUrl.urlMobile + '/mobile/OliviaApis/GetNotificationByUser',
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
            error.param = JSON.stringify(options);
            C.writeErrorLog(error, response);
          } else {
            if (body && body != "[]") {
              var data = JSON.parse(body);
              if (data && data.length > 0) {
                se.zone.run(() => {
                  let countNoti = data.filter(item => { return !item.status }).length;
                  se.valueGlobal.countNotifi = countNoti;
                  se.countmessage = countNoti;
                })
              }
            }
          }
        });
      } else {
        se.valueGlobal.countNotifi = 0;
        se.countmessage = 0;
      }
    })
  }

  gotoPlayStore() {
    this.market.open('https://play.google.com/store/apps/details?id=iVIVU.com');
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
          if (response.statusCode != 200) {
            var objError = {
              page: "roompaymentdoneean",
              func: "refreshToken",
              message: response.statusMessage,
              content: response.body,
              type: "warning",
              param: JSON.stringify(options)
            };
            C.writeErrorLog(objError,response);
          }
          if (error) {
            error.page = "roompaymentdoneean";
            error.func = "refreshToken";
            error.param = JSON.stringify(options);
            C.writeErrorLog(error,response);
          } else {
            var json=JSON.parse(body);
            if (json.auth_token) {
              se.storage.remove('auth_token');
              se.storage.set("auth_token", json.auth_token);
            }
          }
        })
      }
    })
  }

}
