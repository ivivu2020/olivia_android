
import { InsurrancepopoverPage } from './../insurrancepopover/insurrancepopover.page';

import { Component, NgZone, ViewChild, OnInit, Input } from '@angular/core';
import { NavController, ModalController, AlertController, Platform, IonContent, IonSlides, LoadingController, PopoverController, ActionSheetController, ToastController } from '@ionic/angular';
import * as request from 'requestretry';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { C } from './../providers/constants';
import { ValueGlobal, SearchHotel } from '../providers/book-service';
import { GlobalFunction, ActivityService } from './../providers/globalfunction';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { NetworkProvider } from '../network-provider.service';
import { Network } from '@ionic-native/network/ngx';
import { UserReviewsPage } from '../userreviews/userreviews';
import { OverlayEventDetail } from '@ionic/core';
import { UserFeedBackPage } from '../userfeedback/userfeedback';
import * as $ from 'jquery';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { InsurrancedetailPage } from '../insurrancedetail/insurrancedetail.page';
import { Subscription } from 'rxjs/Subscription';
/**
 * Generated class for the MytripsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  @Input('myScrollVanish') scrollArea;
  @ViewChild(IonContent) content: IonContent;
  @ViewChild('mySlider') slider: IonSlides;
  public listMyTrips = [];
  public listHistoryTrips = [];
  public listRequestTrips = [];
  public listAlltrips = [];
  public listSupport = [];
  public currentTrip = 0;
  public currentRQTrip = 0;
  public showCalCin = false;
  public showCalCout = false;
  public datecin: Date;
  public datecout: Date;
  public cindisplay; coutdisplay;
  public cinRQdisplay; coutRQdisplay;
  public cincombodeparturedisplay; cincomboarrivaldisplay; coutcombodeparturedisplay; coutcomboarrivaldisplay;
  public cincombodeparturelocationdisplay; cincomboarrivallocationdisplay; coutcombodeparturelocationdisplay; coutcomboarrivallocationdisplay;
  public cincombodeparturetimedisplay; cincomboarrivaltimedisplay; coutcombodeparturetimedisplay; coutcomboarrivaltimedisplay;
  public cincombodepartureflightnumberdisplay; cincomboarrivalflightnumberdisplay; coutcombodepartureflightnumberdisplay; coutcomboarrivalflightnumberdisplay;
  public cin; cout; coutthu; cinthu; numberOfDay = 0; numberOfRQDay = 0;
  public hasdata = false;
  public hasloaddata = false;
  public hasloadRQdata = false;
  public activeTabTrip = 1;
  public tabtrip: string = "nexttrip";
  public isShowConfirm = false;
  private tabBarHeight;
  private topOrBottom: string;
  private contentBox;
  public currentPosition = 0;
  public intervalID;
  public isRequestTrip = false;
  public isConnected;
  public loader: any;
  public myloader;
  topDealData = [];
  slide;
  Description: any;
  loginuser: any;
  mytripcount = 0;
  requestripcount = 0;
  historytripcount = 0;
  reloadcount=0;
  arrHotelReviews: any[];
  nexttripcounttext = '';
  historytripcounttext = '';popover;arrinsurrance=[];
  
  // arrchild = [{claimed: false,isClaim: false ,id: "CI19T4U00071",name: "Ninh Dương Lan Ngọc", identification: "123456789", address: "Hồ Chí Minh", birth: "09/12/1984"},
  // {claimed: false,isClaim: false ,id: "CI19T4U00072",name: "Ad Pham", identification: "123456789", address: "Hồ Chí Minh", birth: "09/12/1984"}];

  // arrInsurrance = [{claimed: false,isClaim: false ,id: "CI19T4U00069",name: "Phạm Đức Anh", identification: "123456789", address: "Hồ Chí Minh", birth: "09/12/1984"},
  // {claimed: false,isClaim: false ,id: "CI19T4U00070",name: "Đỗ Lê", identification: "123456789", address: "Hồ Chí Minh", birth: "31/01/1985"}]

  arrchildinsurrance:any = [];
  arrchild:any =[];
  private subscription: Subscription;
  listClaimed: any[];
  listClaimedFlightOriginal: any=[];
  firstload:any = true;
  departCodeDisplay: string;
  arrivalCodeDisplay: string;
  isFlyBooking: boolean= false;
  textDeparture: string;
  textRegionDepart: string;
  textRegionReturn: string;
  textAirpotDepart: string;
  textAirpotReturn: string;
  textReturn: string;
  textArrivalRegionDepart: string;
  textArrivalRegionReturn: string;
  textAirpotArrivalDepart: string;
  textAirpotArrivalReturn: string;
  constructor(public platform: Platform, public navCtrl: NavController, public searchhotel: SearchHotel,public popoverController: PopoverController,
    public storage: Storage, public zone: NgZone, public modalCtrl: ModalController, public iab: InAppBrowser,
    public alertCtrl: AlertController, public valueGlobal: ValueGlobal, public gf: GlobalFunction, public loadingCtrl: LoadingController,
    public network: Network,
    public networkProvider: NetworkProvider,
    private router: Router,
    private actionsheetCtrl: ActionSheetController,
    private activatedRoute: ActivatedRoute,
    public toastCtrl: ToastController,
    public activityService: ActivityService) {
    this.handleSplashScreen();
    //this.getdata();
    storage.get('auth_token').then(auth_token => {
      this.loginuser = auth_token;
    });
    //google analytic
    gf.googleAnalytion('mytrips', 'Search', '');
  }

  public async ngOnInit() {
    var se = this;
    //Gọi hàm refresh claim bảo hiểm khi back từ trang hoàn thành claim
    await this.refreshInsurranceInfo();
      this.subscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd && (event.url === '/app/tabs/tab3?refresh=true')) {
          this.refreshInsurranceInfo();
        }
      });
  }

  async ionViewWillEnter() {
    if(this.listMyTrips.length >0){
      this.hasloaddata = true;
      if(this.activityService.insurranceBookingId){
        this.refreshInsurranceInfo();
      }
      if (this.mytripcount + this.requestripcount > 0) {
        let totalnexttrip = this.mytripcount*1 + this.requestripcount*1;
        this.nexttripcounttext = " (" + totalnexttrip + ")";
      } else {
        this.nexttripcounttext = "";
      }
      if(this.historytripcount >0){
        this.historytripcounttext = " (" + this.historytripcount + ")";
      }
    }else{
      this.loadPageData();
    }
  }

  loadPageData(){
    this.gf.clearActivatedTab();
    if (this.gf.getParams('notifiBookingCode') && !this.gf.getParams('selectedTab3')) {
      this.activeTabTrip = 1;
      this.tabtrip = 'nexttrip';
    }
    if(this.gf.getParams('selectedTab3') && this.gf.getParams('notifiBookingCode')){
      this.activeTabTrip = 2;
      this.tabtrip = 'historytrip';
    }
    this.storage.get('auth_token').then((data:any)=>{
      this.loginuser = data;
    })
    
    if (!this.activityService.tab3Loaded || (this.activityService.tab3Loaded && this.listAlltrips.length == 0)) {
      this.mytripcount = 0;
      this.requestripcount = 0;
      this.historytripcount = 0;
      this.historytripcounttext = "";
      this.nexttripcounttext = "";
      //Kiểm tra mạng on/off để hiển thị
      if (this.networkProvider.isOnline()) {
        this.networkProvider.setNetworkStatus(true);
        this.gf.setNetworkStatus(true);
        this.isConnected = true;
        //Có cache thì ưu tiên load cache
        this.storage.get('listmytrips').then(data => {
          if(data){
            this.loadMytrip(data);
            this.activityService.tab3Loaded = true;
            //Sau 10p load lại dữ liệu mới nhất
            setTimeout(() => {
              this.getdata(null);
            }, 600000);
          }else{
            setTimeout(() => {
              this.getdata(null);
              this.activityService.tab3Loaded = true;
            }, 300)
          }
        })
        
        //load dữ liệu topdeal suggest
        this.storage.get('listtopdealdefault').then((data: any) => {
          if (data && data.length > 0) {
            this.topDealData = data;
            //this.slide = data[0];
            this.loaddatatopdeal(data);
          }
        })
      } else {
        this.isConnected = false;

      }
    }else if(this.activityService.tab3Loaded && this.listAlltrips.length >= 0){
      this.hasloaddata = true;
      this.isConnected = true;
      if (this.mytripcount + this.requestripcount > 0) {
        this.nexttripcounttext = " (" + this.mytripcount*1 + this.requestripcount*1 + ")";
      } else {
        this.nexttripcounttext = "";
      }
    }
  }

  ionViewDismiss() {
    this.hasloaddata = false;
  }

  ionViewWillLeave() {
    this.zone.run(() => {
      clearInterval(this.intervalID);
    })
    this.hasloaddata = false;
  }

  async presentLoadingData() {
    this.myloader = await this.loadingCtrl.create({
    });
    this.myloader.present();
  }
  async presentLoadingDuration(timeout) {
    let loader = await this.loadingCtrl.create({
      message: "",
      duration: timeout
    });
    loader.present();
  }

  /***
   * Hàm load thông tin phòng
   */
  getListSupportByUser(auth_token) {
    var se = this;
    if (auth_token) {
      var text = "Bearer " + auth_token;
      var options = {
        method: 'GET',
        url: C.urls.baseUrl.urlMobile + '/mobile/OliviaApis/BookingMemberDetailByUser',
        timeout: 10000, maxAttempts: 5, retryDelay: 2000, retryCount: 0,
        headers:
        {
          'accept': 'application/json',
          'content-type': 'application/json-patch+json',
          authorization: text
        }
      };
      request(options, function (error, response, body) {
        if (error) {
          error.page = "mytrips";
          error.func = "getListSupportByUser";
          error.param = JSON.stringify(options);

          if (options.retryCount > 0) {
            C.writeErrorLog(error,response);
          }
          options.retryCount++;
          throw new Error(error)
        } else {
          options.retryCount++;
          if (body) {
            se.zone.run(() => {
              se.listSupport = JSON.parse(body);
            });
          } else {
            if (response.statusCode == 400 || response.statusCode == 401) {
              if (se.isShowConfirm) return;
              //se.showConfirm();
              se.isShowConfirm = true;
            }
          }
        }
      });
    }
  }

  getdata(token) {
    var se = this;
    se.storage.get('auth_token').then(auth_token => {
      if (auth_token || token) {
        var text = "Bearer " + (auth_token ? auth_token : token);
        var options = {
          method: 'GET',
          url: C.urls.baseUrl.urlMobile + '/api/dashboard/getmytrip?getall=true',
          //url: 'http://192.168.10.121:3400/api/dashboard/getmytrip?getall=true',
          headers:
          {
            'accept': 'application/json',
            'content-type': 'application/json-patch+json',
            authorization: text
          }
        };
        request(options, function (error, response, body) {
          if (error) {
            error.page = "mytrips";
            error.func = "getdata";
            error.param = JSON.stringify(options);
            C.writeErrorLog(error,response);
          } else {
            if (body) {
              se.zone.run(() => {
               
                let lstTrips = JSON.parse(body);
                se.storage.get('listmytrips').then(data => {
                  if(data){
                    se.storage.remove('listmytrips').then(()=>{
                      se.storage.set('listmytrips', lstTrips);
                    })
                  }else{
                    se.storage.set('listmytrips', lstTrips);
                  }
                })
                se.loadMytrip(lstTrips);
                se.hideloader();
              });
            } else {
              if (response.statusCode != 200) {
                se.listMyTrips = [];
                se.listHistoryTrips = [];
                se.hasloaddata = true;
                se.mytripcount = 0;
                se.historytripcount =0;
                se.hideloader();

              }
            }

          }

        });
      } else {
        se.hasloaddata = true;
        se.listMyTrips = [];
        se.listHistoryTrips = [];
        se.hideloader();
        se.mytripcount = 0;
        se.historytripcount =0;
        //se.refreshToken();
      }
    });
    setTimeout(() => {
      if (se.myloader) {
        se.myloader.dismiss();
      }
    }, 1000)
  }

  loadMytrip(listtrips){
    var se = this;
    se.valueGlobal.countclaim=0;
    se.mytripcount = 0;
    se.listMyTrips = [];
    se.historytripcount = 0;
    se.listHistoryTrips = [];

      let lstTrips = listtrips;
      //List trip sắp đi
      if (lstTrips && lstTrips.tripFuture.length > 0) {
        lstTrips.tripFuture.forEach(element => {
          if (element.payment_status != 3 && element.payment_status != -2) {
            if (element.avatar) {
              let urlavatar = element.avatar.substring(0, element.avatar.length - 4);
              let tail = element.avatar.substring(element.avatar.length - 4, element.avatar.length);
              element.avatar = urlavatar + "-" + "104x104" + tail;
            }
            element.isRequestTrip = false;
            se.listMyTrips.push(element);
            se.mytripcount++;
            if(element.insuranceInfo && element.insuranceInfo.adultList.length>0){
              if(se.checkItemHasNotClaim(element.insuranceInfo.adultList) || se.checkItemHasNotClaim(element.insuranceInfo.childList)){
                se.zone.run(()=>{
                  se.valueGlobal.countclaim ++;
                })
              }
            }
          }
        });
        let idx = 0;
        if (se.gf.getParams('mytripbookingdetail') && se.gf.getParams('mytripbookingdetail').currentTrip) {
          idx = se.gf.getParams('mytripbookingdetail').currentTrip;
          se.currentTrip = idx;
        }
      }
      //List trip đã đi
      if (lstTrips && lstTrips.tripHistory.length > 0) {
        lstTrips.tripHistory.forEach(elementHis => {
          if (elementHis.avatar) {
            let urlavatar = elementHis.avatar.substring(0, elementHis.avatar.length - 4);
            let tail = elementHis.avatar.substring(elementHis.avatar.length - 4, elementHis.avatar.length);
            elementHis.avatar157 = urlavatar + "-" + "110x157" + tail;
            elementHis.avatar104 = urlavatar + "-" + "110x104" + tail;
            elementHis.avatar110 = urlavatar + "-" + "110x118" + tail;
          } else {
            elementHis.avatar110 = "//cdn1.ivivu.com/iVivu/2018/02/07/15/noimage-110x124.jpg";
          }

          se.listHistoryTrips.push(elementHis);
          se.historytripcount++;
        
          if(elementHis.insuranceInfo && elementHis.insuranceInfo.adultList.length>0){
            if(se.checkItemHasNotClaim(elementHis.insuranceInfo.adultList) || se.checkItemHasNotClaim(elementHis.insuranceInfo.childList)){
              se.zone.run(()=>{
                se.valueGlobal.countclaim ++;
              })
            }
          }
        });

        if(se.gf.getParams('notifiBookingCode') && se.gf.getParams('selectedTab3') || se.checkishistorytrip()){
          se.activeTabTrip = 2;
          se.tabtrip = 'historytrip';
          //Map số bkg trong listtriphistory để focus vào bkg được notifi
          var idxMap = se.listHistoryTrips.map( (item,index) =>{ 
            return item.booking_id == se.gf.getParams('notifiBookingCode');
          });
          if(idxMap && idxMap.length>0){
            var idx = idxMap.findIndex((el)=>{ return el == true});
            if(se.checkIsSharingTrip()){
              se.feedback(se.listHistoryTrips[idx]);
            }
          }
          //Sau khi map được trip thì set giá trị về null
          se.gf.setParams(null, 'notifiBookingCode');
          se.gf.setParams(null, 'selectedTab3');
        }

        se.historytripcounttext = " (" + se.historytripcount + ")";
      }
      //List trip yêu cầu
      se.storage.get('listrequesttrips').then(data => {
        if(data){
         se.loadRequestTrip(data);
         setTimeout(() => {
          se.getCombineRequestTrip();
         }, 60000);
        }else{
          se.getCombineRequestTrip();
        }
      })
      se.hideloader();
  }

  checkishistorytrip(){
    var se = this;
    var res = false;
    var objmap = se.listHistoryTrips.map( (item,index) =>{ 
      return (item.booking_id == se.gf.getParams('notifiBookingCode'));
    });
    return res = (objmap && objmap.length > 0 && objmap.findIndex((el)=>{ return el == true}) != -1 );
  }

  checkIsSharingTrip(){
    var se = this;
    var res = false;
    var objmap = se.listHistoryTrips.map( (item,index) =>{ 
      return (item.booking_id == se.gf.getParams('notifiBookingCode') && se.gf.getParams('selectedTab3') != null);
    });
    return res = (objmap && objmap.length > 0 && objmap.findIndex((el)=>{ return el == true}) != -1 );
  }
  /**
   * Thực hiện sort theo checkin/startdate
   * Vì có 2 list mytrip và requestrip nên phải sort lại đồng nhất theo date
   */
  sortMytrip() {
    var se = this;
    if (se.listMyTrips && se.listMyTrips.length > 0) {
      se.zone.run(() => se.listMyTrips.sort(function (a, b) {
        let direction = -1;
        if (!a['isRequestTrip'] && !b['isRequestTrip']) {
          if (moment(a['checkInDate']).diff(moment(b['checkInDate']), 'days') > 0) {
            return -1 * direction;
          }
          else {
            return 1 * direction;
          }
        }
        else if (!a['isRequestTrip'] && b['isRequestTrip']) {
          if (moment(a['checkInDate']).diff(moment(b['start_date']), 'days') > 0) {
            return -1 * direction;
          }
          else {
            return 1 * direction;
          }
        }
        else if (a['isRequestTrip'] && !b['isRequestTrip']) {
          if (moment(a['start_date']).diff(moment(b['checkInDate']), 'days') > 0) {
            return -1 * direction;
          }
          else {
            return 1 * direction;
          }
        } else {
          if (moment(a['start_date']).diff(moment(b['start_date']), 'days') > 0) {
            return -1 * direction;
          }
          else {
            return 1 * direction;
          }
        }
      }));
    }
  };

  hideloader() {
    var se = this;
    if (se.myloader) {
      se.myloader.dismiss();
    }
  }

  getDayOfWeek(day){
    let arrdate = day.split('/');
    let newdate = new Date(arrdate[2], arrdate[1], arrdate[0]);
    let cinthu = moment(newdate).format("dddd");
    switch (cinthu) {
      case "Monday":
        cinthu = "Thứ 2";
        break;
      case "Tuesday":
        cinthu = "Thứ 3";
        break;
      case "Wednesday":
        cinthu = "Thứ 4";
        break;
      case "Thursday":
        cinthu = "Thứ 5";
        break;
      case "Friday":
        cinthu = "Thứ 6";
        break;
      case "Saturday":
        cinthu = "Thứ 7";
        break;
      default:
        cinthu = "Chủ nhật";
        break;
    }
    return cinthu;
  }

  getAirpot(code){
    let name = '';
    switch (code) {
      case "SGN":
        name = "Sân bay Tân Sơn Nhất | "+ code;
        break;
      case "PQC":
        name = "Sân bay Phú Quốc | "+ code;
        break;
      case "DAD":
        name = "Sân bay Đà Nẵng | "+ code;
        break;
      case "HAN":
        name = "Sân bay Nội Bài | "+ code;
        break;
    }
    return name;
  }

  getRegionByCode(code){
    let name = '';
    switch (code) {
      case "SGN":
        name = "TP HCM";
        break;
      case "PQC":
        name = "Phú Quốc";
        break;
      case "DAD":
        name = "Đà Nẵng";
        break;
      case "HAN":
        name = "Hà Nội";
        break;
    }
    return name;
  }

  setCheckInCheckOutInfo(obj) {
    var se = this;
    se.arrinsurrance=[];
    se.arrchildinsurrance = [];
    se.isFlyBooking = obj.booking_id.indexOf('FLY') != -1 ? true : false;
    se.datecin = new Date(obj.checkInDate);
    se.datecout = new Date(obj.checkOutDate);
    se.cindisplay = moment(se.datecin).format('DD-MM-YYYY');
    se.coutdisplay = moment(se.datecout).format('DD-MM-YYYY');
    if (obj.bookingsComboData) {
      se.valueGlobal.bookingsComboData=obj.bookingsComboData[0];
      se.cincombodeparturedisplay = moment(new Date(obj.bookingsComboData[0].departureDate)).format('DD-MM-YYYY');
      se.cincomboarrivaldisplay = moment(new Date(obj.bookingsComboData[0].arrivalDate)).format('DD-MM-YYYY');
      if(obj.bookingsComboData.length >1){
        se.coutcombodeparturedisplay = moment(new Date(obj.bookingsComboData[1].departureDate)).format('DD-MM-YYYY');
        se.coutcomboarrivaldisplay = moment(new Date(obj.bookingsComboData[1].arrivalDate)).format('DD-MM-YYYY');
      }

      if(se.isFlyBooking){
        se.textDeparture = se.getDayOfWeek(obj.bookingsComboData[0].departureDate) + ', ' + obj.bookingsComboData[0].departureDate;
        se.textRegionDepart = se.getRegionByCode(obj.bookingsComboData[0].flightFrom);
        se.textRegionReturn = se.getRegionByCode(obj.bookingsComboData[0].flightTo);
        se.textAirpotDepart = se.getAirpot(obj.bookingsComboData[0].flightFrom);
        se.textAirpotReturn = se.getAirpot(obj.bookingsComboData[0].flightTo);
        if(obj.bookingsComboData.length >1){
          se.textReturn = se.getDayOfWeek(obj.bookingsComboData[1].departureDate) + ', ' + obj.bookingsComboData[1].departureDate;
          se.textArrivalRegionDepart = se.getRegionByCode(obj.bookingsComboData[1].flightFrom);
          se.textArrivalRegionReturn = se.getRegionByCode(obj.bookingsComboData[1].flightTo);
          se.textAirpotArrivalDepart = se.getAirpot(obj.bookingsComboData[1].flightFrom);
          se.textAirpotArrivalReturn = se.getAirpot(obj.bookingsComboData[1].flightTo);
        }

        if(obj.bookingsComboData[0].passengers && obj.bookingsComboData[0].passengers.length >0){
          obj.bookingsComboData[0].passengers.forEach( (element, index) => {
            let arr = element.dob.split('/');
            let newdate = new Date(arr[2], arr[1], arr[0]);
            let yearold = moment(new Date()).diff(moment(newdate), 'years');
            element.isAdult = yearold > 12 ? true : false;

            if(element.hanhLy && element.hanhLy.length >0){
              let arrlug = element.hanhLy.split(':');
              element.arrlug = [];
              if(arrlug && arrlug.length >0){
                let idx =0;
                arrlug.forEach(lug => {
                  if(idx >0){
                    let arrlugname = lug;
                    if(arrlugname.length > 4){
                      arrlugname = arrlugname.substring(0,4);
                    }
                    if(idx == 1){
                      element.arrlug.push({lugname: obj.bookingsComboData[0].flightFrom + " - " + obj.bookingsComboData[0].flightTo , lugweight: arrlugname});
                    }
                    else if(obj.bookingsComboData.length >1 && idx == 2){
                      element.arrlug.push({lugname: obj.bookingsComboData[1].flightFrom + " - " + obj.bookingsComboData[1].flightTo, lugweight: arrlugname});
                    }
                    
                  }
                  
                  idx++;
                });
              }
            }
          });
        }
      }
    }
    
    se.numberOfDay = moment(se.datecout).diff(moment(se.datecin), 'days');
    //Set flight info nếu là combo
    if (obj.flight_ticket_info) {
       //Add bảo hiểm
      if (obj.insurance_info) {
        let insurance = obj.insurance_info.split("#");
        se.listClaimed = [];
        se.arrchild = [];
        se.arrchildinsurrance = [];
        for (let i = 0; i < insurance.length; i++) {
          if (insurance[i]) {
            var text= insurance[i].split("|");
            if(text[0] != " "){
              var claimed = text[0].split(";");
              claimed.forEach(element => {
                se.listClaimed.push({flight_number: element.trimEnd().replace(" ",""), insurance_code:text[1], bookingid: obj.booking_id});
              });
            }
          }
        }

        if(se.activityService.objClaimed){
          let objClaimed = se.activityService.objClaimed;
          let fn = objClaimed.flightNumber.replace(" ","");
          var objcheck = {flight_number: fn , insurance_code: objClaimed.code, bookingid: obj.booking_id};
          if(!se.checkExitClaim(se.listClaimed,objcheck, obj.booking_id )){
            se.listClaimed.push(objcheck);
          }
          
          if(objClaimed.listchildclaimed && objClaimed.listchildclaimed.length >0){
            objClaimed.listchildclaimed.forEach(element => {
              var objChildcheck = {flight_number: fn , insurance_code: element.code, bookingid: obj.booking_id};
              if(!se.checkExitClaim(se.listClaimed,objChildcheck, obj.booking_id)){
                se.listClaimed.push(objChildcheck);
              }
            });
          }
        }

        se.zone.run(()=>{
          obj.insuranceInfo.adultList.forEach(element => {
            var listfilter = se.listClaimed.filter((item)=>{ return item.insurance_code == element.id && item.bookingid == obj.booking_id});
              var listunique = [];
              if(listfilter && listfilter.length >0){
                listfilter.forEach(element => {
                  if(listunique.length ==0){
                    listunique.push(element);
                  }else{
                    var bexists = listunique.filter((el)=>{ return el.flight_number == element.flight_number}).length >0 ? true : false;
                    if(!bexists){
                      listunique.push(element);
                    }
                  }
                });
              }
              
            claimed = listunique.length >1 ? true : false;
            let itemAdult = {claimed: claimed ,insurance_code: element.id,customer_name: element.name, customer_id: element.identification, customer_address: element.address, customer_dob: element.birth};
            se.arrinsurrance.push(itemAdult);
          });
  
          obj.insuranceInfo.childList.forEach(element => {
            let claimed = false;
            if(se.listClaimed && se.listClaimed.length >0){
              var listfilter = se.listClaimed.filter((item)=>{ return item.insurance_code == element.id && item.bookingid == obj.booking_id});
            }
            var listunique = [];
            if(listfilter && listfilter.length >0){
              listfilter.forEach(element => {
                if(listunique.length ==0){
                  listunique.push(element);
                }else{
                  var bexists = listunique.filter((el)=>{ return el.flight_number == element.flight_number}).length >0 ? true : false;
                  if(!bexists){
                    listunique.push(element);
                  }
                }
              });
            }
            claimed = listunique.length >1 ? true : false;
            let itemchild = {claimed: claimed ,insurance_code: element.id,customer_name: element.name, customer_id: element.identification, customer_address: element.address, customer_dob: element.birth};
            se.arrchildinsurrance.push(itemchild);
            se.arrchild.push(element);
          });
        })
        


        //test cathay
        // se.arrInsurrance.forEach(element => {
        //   let itemAdult = {claimed: claimed != " " ? true : false,insurance_code: element.id,customer_name: element.name, customer_id: element.identification, customer_address: element.address, customer_dob: element.birth};
        //   se.arrinsurrance.push(itemAdult);
          
        // });
        // se.arrchild.forEach(element => {
        //   let itemchild = {claimed: claimed ,insurance_code: element.id,customer_name: element.name, customer_id: element.identification, customer_address: element.address, customer_dob: element.birth};
        //   se.arrchildinsurrance.push(itemchild);
        // })
      }
      //test bảo hiểm
      // se.arrinsurrance = [{claimed: false ,insurance_code: "CI19T4U00071",customer_name: "Ninh Dương Lan Ngọc", customer_id: "123456789", customer_address: "Hồ Chí Minh", customer_dob: "09/12/1984"},
      // {claimed: false ,insurance_code: "CI19T4U00072",customer_name: "Ad Pham", customer_id: "123456789", customer_address: "Hồ Chí Minh", customer_dob: "09/12/1984"}];

      let arrInfo = obj.flight_ticket_info.split("<br/>");
      if (arrInfo.length == 2) {
        let arrFlightStart = arrInfo[0].split("|");
        let arrFlightReturn = arrInfo[1].split("|");
        se.cincombodeparturedisplay = arrFlightStart[0];
        se.cincombodeparturelocationdisplay = arrFlightStart[1];
        se.cincombodepartureflightnumberdisplay = arrFlightStart[2];
        //se.cincombodepartureflightnumberdisplay = arrFlightStart[3];

        se.cincomboarrivaldisplay = arrFlightReturn[0];
        se.cincomboarrivallocationdisplay = arrFlightReturn[1];
        se.cincomboarrivalflightnumberdisplay = arrFlightReturn[2];
        //se.cincomboarrivalflightnumberdisplay = arrFlightReturn[3];
      }
      else if (arrInfo.length > 2) {
        let arrFlightStart = arrInfo[0].split("|");
        let arrFlightReturn = [];
        if(arrInfo[1].indexOf('|') != -1){
          arrFlightReturn =  arrInfo[1].split("|");
        }else if(arrInfo[2].indexOf('|') != -1){
          arrFlightReturn =  arrInfo[2].split("|");
        }
        se.cincombodeparturedisplay = arrFlightStart[0];
        se.cincombodeparturelocationdisplay = arrFlightStart[1];
        se.cincombodepartureflightnumberdisplay = arrFlightStart[2];
        
        //se.cincombodepartureflightnumberdisplay = arrFlightStart[3];

        se.cincomboarrivaldisplay = arrFlightReturn[0];
        se.cincomboarrivallocationdisplay = arrFlightReturn[1];
        se.cincomboarrivalflightnumberdisplay = arrFlightReturn[2];
        //se.cincomboarrivalflightnumberdisplay = arrFlightReturn[3];
      }
    }

    if(obj.bookingsComboData && obj.bookingsComboData.length >2){
      obj.bookingsComboData = obj.bookingsComboData.slice(0,2);
    }

    if(obj.bookingsComboData && obj.bookingsComboData.length >1){
      se.departCodeDisplay =  obj.bookingsComboData[0].departCode + ' → ' + obj.bookingsComboData[0].arrivalCode;
      if(obj.bookingsComboData.length >1){
        se.arrivalCodeDisplay = obj.bookingsComboData[1].departCode + ' → ' + obj.bookingsComboData[1].arrivalCode;
      }
    }
  }

  checkExitClaim(listcheck, itemcheck, bkgid){
    var se = this, res = false;
      res = listcheck.filter((item)=>{ return item.flight_number == itemcheck.flight_number && item.insurance_code == itemcheck.insurance_code && item.bookingid == bkgid}).length >0 ? true: false;
    return res;
  }

  setCheckInCheckOutRQInfo(obj) {
    var se = this;
    var datecinRQ = new Date(obj.start_date);
    var datecoutRQ = new Date(obj.end_date);
    se.cinRQdisplay = moment(datecinRQ).format('DD-MM-YYYY');
    se.coutRQdisplay = moment(datecoutRQ).format('DD-MM-YYYY');

    se.numberOfRQDay = moment(datecoutRQ).diff(moment(datecinRQ), 'days');
  }

  ionViewDidLoad() {
    let elements = document.querySelectorAll(".tabbar");

    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'flex';
      });
    }
    //30p load lại trạng thái 1 lần
    var se = this;
    se.intervalID = setInterval(() => {
      //se.getdata();
      //Kiểm tra mạng trước khi loaddata
      this.networkProvider.getNetworkStatus().subscribe((connected: boolean) => {
        this.isConnected = connected;
        if (this.isConnected) {
          setTimeout(() => {
            this.getdata(null);
          }, 100)
        } else {
          this.gf.showWarning('Không có kết nối mạng', 'Vui lòng kết nối mạng để sử dụng các tính năng của ứng dụng', 'Đóng');
        }
      });
    }, 1800000);
  }
  

  loaddatatopdeal(data: any) {
    var se = this;
    var chuoi = "";
    se.zone.run(() => {
      //for (let i = 0; i < se.pageSize; i++) {
      let i = 0;
      if (data[i].images[0]) {
        var res = data[i].images[0].url.substring(0, 4);
        if (res != "http") {
          data[i].images[0].url = 'https:' + data[i].images[0].url;
        }
        var minPrice = data[i].minPrice.toLocaleString();
        chuoi = "";
        var name = data[i].name.split('|');
        for (let x = 1; x < name.length; x++) {
          if (x == name.length - 1) {
            chuoi = chuoi + name[x];
          } else {
            chuoi = chuoi + name[x] + "|";
          }
        }
        switch (data[i].rating) {
          case 50:
            data[i].rating = "./assets/star/ic_star_5.svg";
            break;
          case 45:
            data[i].rating = "./assets/star/ic_star_4.5.svg";
            break;
          case 40:
            data[i].rating = "./assets/star/ic_star_4.svg";
            break;
          case 35:
            data[i].rating = "./assets/star/ic_star_3.5.svg";
            break;
          case 30:
            data[i].rating = "./assets/star/ic_star_3.svg";
            break;
          case 25:
            data[i].rating = "./assets/star/ic_star_2.5.svg";
            break;
          case 20:
            data[i].rating = "./assets/star/ic_star_2.svg";
            break;
          case 15:
            data[i].rating = "./assets/star/ic_star_1.5.svg";
            break;
          case 10:
            data[i].rating = "./assets/star/ic_star.svg";
            break;
          case 5:
            data[i].rating = "./assets/star/ic_star_0.5.svg";
            break;
          default:
            break;
        }
        var item = { ischecked: 0, id: data[i].id, name: name[0], imageUrl: data[i].images[0].url, regionName: data[i].regionName, minPrice: minPrice, description: chuoi, rating: data[i].rating, priceshow: (data[i].minPrice / 1000).toLocaleString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.").replace(',', '.') };
        se.zone.run(()=>{
          se.slide = item;
        })
        
        //load combodetail
        se.loaddetailcombo(item.id);
      }

      //}
    })

  }

  loaddetailcombo(hotelID) {
    let url = C.urls.baseUrl.urlPost + "/mhoteldetail/" + hotelID;
    var se = this;
    var options = {
      method: 'POST',
      url: url,
      timeout: 180000, maxAttempts: 5, retryDelay: 2000,
    };
    request(options, function (error, response, body) {
      if (response.statusCode != 200) {
        var objError = {
          page: "hoteldetail",
          func: "loaddata",
          message: response.statusMessage,
          content: response.body,
          type: "warning",
          param: JSON.stringify(options)
        };
        C.writeErrorLog(objError,response);
      }
      if (error) {
        error.page = "hoteldetail";
        error.func = "loaddata";
        error.param = JSON.stringify(options);
        C.writeErrorLog(objError,response);
      }
      if (response.statusCode == 200) {
        let jsondata = JSON.parse(body);
        if (jsondata.Combos || jsondata.ComboPromotion) {
          se.Description = jsondata.ComboPromtion ? jsondata.ComboPromtion.Description.replace(/\r\n/g, "<br/>") : jsondata.Combos.Description.replace(/\r\n/g, "<br/>");
          se.Description = se.Description.replace("Trọn gói bao gồm:", "");
          se.Description = se.Description.replace(/#r/g, "");
          se.Description = se.Description.replace(/r#/g, "");
          se.Description = se.Description.replace(/#m/g, "");
          se.Description = se.Description.replace(/m#/g, "");
          se.Description = se.Description.replace(/#n/g, "");
          se.Description = se.Description.replace(/n#/g, "");
          se.Description = se.Description.replace(/n#/g, "");
        }
      }
    })
  }

  viewComboDetail(item) {
    this.searchhotel.hotelID = item.id;
    this.searchhotel.rootPage = "MyTrip";
    this.navCtrl.navigateForward('/hoteldetail/' + item.id);
  }

  viewComboList() {
    this.navCtrl.navigateForward('/combolist');
  }

  async handleSplashScreen(): Promise<void> {
    try {
      // wait for App to finish loading
      await this.platform.ready()
    } catch (error) {
      if (error) {
        error.page = "mytrips";
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

  goback() {
    this.navCtrl.navigateRoot('/');
  }

  enableTabbar(modal) {
    modal.onDidDismiss(() => {
      let elements = document.querySelectorAll(".tabbar");
      if (elements != null) {
        Object.keys(elements).map((key) => {
          elements[key].style.display = 'flex';
        });
      }
    })
  }

  openBookingTrip(trip) {
    if (!this.networkProvider.isOnline()) {
      this.gf.showWarning('Không có kết nối mạng', 'Vui lòng kết nối mạng để sử dụng các tính năng của ứng dụng', 'Đóng');
      return;
    }
    if (trip && !trip.isRequestTrip) {
      this.gf.setParams({ trip: trip, currentTrip: this.currentTrip }, 'mytripbookingdetail');
      this.router.navigateByUrl('/mytripbookingdetail');
      //google analytic
      this.gf.googleAnalytion('mytrips', 'Search', '/opentripdeail');
    }
  }

  openWeather(cityname) {
    this.navCtrl.navigateForward('/tripweather/' + cityname);
    //google analytic
    this.gf.googleAnalytion('mytrips', 'Search', 'openweather/' + cityname);
  }

  openHotelNotes(notes) {
    if (!this.networkProvider.isOnline()) {
      this.gf.showWarning('Không có kết nối mạng', 'Vui lòng kết nối mạng để sử dụng các tính năng của ứng dụng', 'Đóng');
      return;
    }
    this.gf.setParams(notes, 'hotelnotes');
    this.navCtrl.navigateForward('/hotelnotes');
    //google analytic
    this.gf.googleAnalytion('mytrips', 'Search', 'opentripnote');
  }

  openHotelExpsNotes(trip, notes, provincename) {
    var se = this;
    if (!se.networkProvider.isOnline()) {
      se.gf.showWarning('Không có kết nối mạng', 'Vui lòng kết nối mạng để sử dụng các tính năng của ứng dụng', 'Đóng');
      return;
    }
    se.gf.setParams({ notes: notes, provincename: provincename }, 'hotelexpsnotes')
    //check location của ks
    if(trip.provinceName){
      var regionCode = se.gf.convertFontVNI(trip.provinceName).replace(/ /g,'-');
        regionCode = regionCode.toLowerCase();
        regionCode = regionCode.replace('---','-');
        regionCode = regionCode.replace('-province','');
        regionCode = regionCode.replace('tinh-','');
        regionCode = regionCode.replace('-district','');

        se.searchhotel.inputExperienceItem = {};
          se.searchhotel.inputExperienceItem.regionCode = regionCode;
          se.searchhotel.inputExperienceRegionCode = regionCode;
          se.searchhotel.inputExperienceRegionName = trip.provinceName;
          se.searchhotel.inputExperienceText = trip.provinceName;
          se.searchhotel.inputExperienceItem.latitude = trip.Latitude;
          se.searchhotel.inputExperienceItem.longitude = trip.Longitude;
          se.valueGlobal.backValue = 'tab3';
          se.navCtrl.navigateForward('/experiencesearch');
    }else{
      se.navCtrl.navigateForward('/hotelexpsnotes');
    }
  }

  async presentLoading() {
    this.loader = await this.loadingCtrl.create({
      duration: 300
    });
    this.loader.present();
  }

  nextTrip() {
    if (!this.networkProvider.isOnline()) {
      this.gf.showWarning('Không có kết nối mạng', 'Vui lòng kết nối mạng để sử dụng các tính năng của ứng dụng', 'Đóng');
      return;
    }

    this.zone.run(() => {
      this.currentTrip = this.currentTrip + 1;
      // if (this.currentTrip > 0) {
      //   this.presentLoadingDuration(300);
      // }
      let obj = this.listMyTrips[this.currentTrip];
      if (!obj.isRequestTrip) {
        this.setCheckInCheckOutInfo(obj);
        this.isRequestTrip = false;
      } else {
        this.setCheckInCheckOutRQInfo(obj);
        this.isRequestTrip = true;
      }
    })
    if(this.content){
      this.content.scrollToTop(500);
    }
    
    //google analytic
    this.gf.googleAnalytion('mytrips', 'Search', 'nexttrip');
  }

  previousTrip() {
    if (!this.networkProvider.isOnline()) {
      this.gf.showWarning('Không có kết nối mạng', 'Vui lòng kết nối mạng để sử dụng các tính năng của ứng dụng', 'Đóng');
      return;
    }
    //this.presentLoadingDuration(300);
    this.zone.run(() => {
      this.currentTrip = this.currentTrip - 1;
      let obj = this.listMyTrips[this.currentTrip];
      if (!obj.isRequestTrip) {
        this.setCheckInCheckOutInfo(obj);
        this.isRequestTrip = false;
      } else {
        this.setCheckInCheckOutRQInfo(obj);
        this.isRequestTrip = true;
      }
    })
    if(this.content){
      this.content.scrollToTop(500);
    }
    
    //google analytic
    this.gf.googleAnalytion('mytrips', 'Search', 'previoustrip');
  }

  nextRQTrip() {
    this.zone.run(() => {
      this.currentRQTrip = this.currentRQTrip + 1;
      let obj = this.listRequestTrips[this.currentRQTrip];
      this.setCheckInCheckOutRQInfo(obj);
    })
    if(this.content){
      this.content.scrollToTop(50);
    }
    //google analytic
    this.gf.googleAnalytion('mytrips', 'Search', 'nextrequesttrip');
  }

  previousRQTrip() {
    this.zone.run(() => {
      this.currentRQTrip = this.currentRQTrip - 1;
      let obj = this.listRequestTrips[this.currentRQTrip];
      this.setCheckInCheckOutRQInfo(obj);
    })
    if(this.content){
      this.content.scrollToTop(50);
    }
    //google analytic
    this.gf.googleAnalytion('mytrips', 'Search', 'previousrequesttrip');
  }

  openHistoryTrip() {
    // let modal = this.modalCtrl.create('MytripsHistoryPage',{lstHistoryTrips: this.listHistoryTrips});
    // modal.present();
    // this.enableTabbar(modal);
    this.navCtrl.navigateForward('/mytripshistory');
    //google analytic
    this.gf.googleAnalytion('mytrips', 'Search', 'openhistorytrip');
  }

  openInclusion(inclusion) {
    // let modal = this.modalCtrl.create('ComboInClusionPage',{comboInclusion: inclusion});
    // modal.present();
    // this.enableTabbar(modal);
    this.navCtrl.navigateForward('/comboinclusion');
    //google analytic
    this.gf.googleAnalytion('mytrips', 'Search', 'openinclusion');
  }

  /***
     * Gọi tổng đài hỗ trợ
     * PDANH 26/02/2019
     */
  async makeCallSupport(phone) {
    try {
      setTimeout(() => {
        window.open(`tel:${phone}`, '_system');
      }, 10);
    }
    catch (error) {
      if (error) {
        error.page = "mytrips";
        error.func = "makeCallSupport";
        C.writeErrorLog(error,null);
      };
    }
    //google analytic
    this.gf.googleAnalytion('mytrips', 'Search', 'callsupport');
  }

  public async showConfirm() {
    let alert = await this.alertCtrl.create({
      message: "Phiên đăng nhập hết hạn. Xin vui lòng đăng nhập lại để sử dụng chức năng này.",
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
            this.storage.remove('blogtripdefault');
            this.zone.run(()=>{
              this.mytripcount =0;
              this.nexttripcounttext="";
              this.historytripcounttext="";
              this.requestripcount = 0;
              this.historytripcount =0;
              this.loginuser = null;
            this.valueGlobal.countNotifi = 0;
            })
            this.navCtrl.navigateRoot('/');
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
            this.storage.remove('blogtripdefault');
            this.zone.run(()=>{
              this.mytripcount =0;
              this.nexttripcounttext="";
              this.historytripcounttext="";
              this.requestripcount = 0;
              this.historytripcount =0;
              this.loginuser = null;
              this.valueGlobal.countNotifi = 0;
            })
            //this.valueGlobal.logingoback = "MainPage";
            this.navCtrl.navigateForward('/login');
          }
        },
      ]
    });
    alert.present();
  }

  SelectNextTrip() {
    this.activeTabTrip = 1;
    if (document.querySelector(".tabbar")) {
      document.querySelector(".tabbar")['style'].display = 'flex';
    }
    //google analytic
    this.gf.googleAnalytion('mytrips', 'Search', 'selectnexttrip');
  }

  SelectHistoryTrip() {
    this.activeTabTrip = 2;
    if (document.querySelector(".tabbar")) {
      document.querySelector(".tabbar")['style'].display = 'flex';
    }
    this.loadUserReviews();
    //google analytic
    this.gf.googleAnalytion('mytrips', 'Search', 'selecthistorytrip');
  }


  SelectRequestTrip() {
    this.activeTabTrip = 3;
    if (document.querySelector(".tabbar")) {
      document.querySelector(".tabbar")['style'].display = 'flex';
    }
    this.getRequestTrip();
    //google analytic
    this.gf.googleAnalytion('mytrips', 'Search', 'selectrequesttrip');
  }

  getRequestTrip() {
    var se = this;
    se.storage.get('auth_token').then(auth_token => {
      if (auth_token) {
        var text = "Bearer " + auth_token;
        var options = {
          method: 'GET',
          url: C.urls.baseUrl.urlMobile + '/api/dashboard/GetMyRequestPrice',
          headers:
          {
            'accept': 'application/json',
            'content-type': 'application/json-patch+json',
            authorization: text
          }
        };
        request(options, function (error, response, body) {
          if (response.statusCode != 200) {
            var objError = {
              page: "mytrips",
              func: "getRequestTrip",
              message: response.statusMessage,
              content: response.body,
              type: "warning",
              param: JSON.stringify(options),
            };
            C.writeErrorLog(objError,response);
          }
          if (error) {
            error.page = "mytrips";
            error.func = "getRequestTrip";
            error.param = JSON.stringify(options);
            C.writeErrorLog(error,response);
          } else {
            if (body) {
              se.zone.run(() => {
                se.listRequestTrips = [];
                var result = JSON.parse(body);
                let lstRQTrips = result.data;
                se.hasloadRQdata = true;
                //List trip yêu cầu
                lstRQTrips.forEach(element => {
                  let urlavatar = element.hotelAvatar.substring(0, element.hotelAvatar.length - 4);
                  let tail = element.hotelAvatar.substring(element.hotelAvatar.length - 4, element.hotelAvatar.length);
                  element.hotelAvatar = urlavatar + "-" + "104x104" + tail;
                  se.listRequestTrips.push(element);
                });
                if (se.listRequestTrips.length > 0) {
                  let obj = se.listRequestTrips[0];
                  se.setCheckInCheckOutRQInfo(obj);
                }
              });
            } else {
              if (response.statusCode != 200) {
                se.listRequestTrips = [];
                se.hasloadRQdata = true;
              }
            }

          }

        });
      } else {
        se.hasloadRQdata = true;
        se.listRequestTrips = [];
      }
    });
  }

  getCombineRequestTrip() {
    var se = this;
    se.storage.get('auth_token').then(auth_token => {
      if (auth_token) {
        var text = "Bearer " + auth_token;
        var options = {
          method: 'GET',
          url: C.urls.baseUrl.urlMobile + '/api/dashboard/GetMyRequestPrice',
          headers:
          {
            'accept': 'application/json',
            'content-type': 'application/json-patch+json',
            authorization: text
          }
        };
        request(options, function (error, response, body) {
          if (response.statusCode != 200) {
            var objError = {
              page: "mytrips",
              func: "getRequestTrip",
              message: response.statusMessage,
              content: response.body,
              type: "warning",
              param: JSON.stringify(options),
            };
            C.writeErrorLog(objError,response);
          }
          if (error) {
            error.page = "mytrips";
            error.func = "getRequestTrip";
            error.param = JSON.stringify(options);
            C.writeErrorLog(error,response);
          } else {
            if (body) {
              se.zone.run(() => {
              
                var result = JSON.parse(body);
                se.storage.get('listrequesttrips').then(data => {
                  if(data){
                    se.storage.remove('listrequesttrips').then(()=>{
                      se.storage.set('listrequesttrips', result);
                    })
                  }else{
                    se.storage.set('listrequesttrips', result);
                  }
                })
                se.loadRequestTrip(result);
                se.getListSupportByUser(auth_token);
              });
            } else {
              if (response.statusCode != 200) {
                se.listRequestTrips = [];
                se.requestripcount = 0;
                if (se.mytripcount + se.requestripcount > 0) {
                  se.nexttripcounttext = " (" + se.mytripcount + se.requestripcount + ")";
                } else {
                  se.nexttripcounttext = "";
                }
                se.hasloadRQdata = true;
                se.hasloaddata = true;
                if (se.myloader) {
                  se.myloader.dismiss();
                }
              }
            }

          }

        });
      } else {
        se.hasloaddata = true;
        se.hasloadRQdata = true;
        se.listRequestTrips = [];
        se.listHistoryTrips = [];
        if (se.myloader) {
          se.myloader.dismiss();
        }
      }
    });
    setTimeout(() => {
      if (se.myloader) {
        se.myloader.dismiss();
      }
    }, 1000)
  }

  loadRequestTrip(listrequesttrips){
    var se = this;
    //se.currentTrip = 0;
    se.requestripcount = 0;
    se.listRequestTrips = [];
    let lstRQTrips = listrequesttrips.data;
     se.hasloadRQdata = true;
     //List trip yêu cầu
     lstRQTrips.forEach(element => {
       if (!element.booking_id && element.payment_status != 3 && element.payment_status != -2) {
         let urlavatar = element.hotelAvatar.substring(0, element.hotelAvatar.length - 4);
         let tail = element.hotelAvatar.substring(element.hotelAvatar.length - 4, element.hotelAvatar.length);
         element.hotelAvatar = urlavatar + "-" + "104x104" + tail;
         element.isRequestTrip = true;
         se.listRequestTrips.push(element);
         se.requestripcount++;
       }
     });

     if (se.listRequestTrips.length > 0) {
       se.listMyTrips.push(...se.listRequestTrips)
     }

     se.sortMytrip();

     if (se.listMyTrips.length > 0) {
     //Tạm thời gọi api get notifi để build lại thông tin thay đổi chuyến bay nếu có
     se.loadUserNotificationAndMapFlightChange();

       if (se.gf.getParams('notifiBookingCode')) {
         //Map số bkg trong listtrip để focus vào bkg được notifi
         var idxMap = se.listMyTrips.map((item, index) => {
           return item.booking_id == se.gf.getParams('notifiBookingCode');
         });
         if (idxMap && idxMap.length > 0) {
           var idx = idxMap.findIndex((el) => { return el == true });
           se.currentTrip = idx;
         }
         //Sau khi map được trip thì set giá trị về null
         se.gf.setParams(null, 'notifiBookingCode');
       }

       //Map item được claim nếu có load lại dữ liệu
       if(se.activityService.insurranceBookingId){
         var idxMap = se.listMyTrips.map((item, index) => {
           return item.booking_id == se.activityService.insurranceBookingId;
         });
         if (idxMap && idxMap.length > 0) {
           var idx = idxMap.findIndex((el) => { return el == true });
           se.currentTrip = idx;
         }
       }
        
       if (se.currentTrip && se.currentTrip != -1) {
         let obj = se.listMyTrips[se.currentTrip];
         if (!obj.isRequestTrip) {
           se.setCheckInCheckOutInfo(obj);
           se.isRequestTrip = false;
         } else {
           se.setCheckInCheckOutRQInfo(obj);
           se.isRequestTrip = true;
         }
       }
       else {
         se.currentTrip = -1;
         if (se.listMyTrips.length > 0) {
           se.nextTrip();
         }

       }
     } else {
       se.hasdata = false;
     }
     se.hasloaddata = true;
     se.hasdata = true;
     setTimeout(() => {
       if (se.myloader) {
         se.myloader.dismiss();
       }
       if (se.mytripcount + se.requestripcount > 0) {
         se.nexttripcounttext = " (" + (se.mytripcount + se.requestripcount) + ")";
       } else {
         se.nexttripcounttext = "";
       }

     }, 300);
     se.getListSupportByUser(this.loginuser);
  }

  public scrollFunction = (event: any) => {
    var se = this;
    se.zone.run(() => {
      if (!se.currentPosition) {
        se.currentPosition = event.detail.scrollTop;
      }
      if (event.detail.scrollTop > se.currentPosition) {
        document.querySelector(".tabbar")['style'].display = 'none';
        if (se.topOrBottom == "top") {
          se.contentBox.marginTop = 0;
        } else if (se.topOrBottom == "bottom") {
          se.contentBox.marginBottom = 0;
        }

      } else {
        if (document.querySelector(".tabbar")) {
          document.querySelector(".tabbar")['style'].display = 'flex';
        }

        if (se.topOrBottom == "top") {
          se.contentBox.marginTop = se.tabBarHeight;
        } else if (se.topOrBottom == "bottom") {
          se.contentBox.marginBottom = se.tabBarHeight;
        }

      }//if else
      if (se.activeTabTrip != 1) {
        if (document.querySelector(".tabbar")) {
          document.querySelector(".tabbar")['style'].display = 'flex';
          return;
        }
      }
    })
  }

  async feedback(trip: any) {
    var se = this;
    if(trip.booking_id){
    se.checkBookingReview(trip).then((result) => {
        if(result){
          se.showUserFeedBackPage(trip);
        }
      })
    }
  }

  async showUserFeedBackPage(trip){
    var se = this;
    se.gf.setParams(trip,'tripFeedBack');
      const modal: HTMLIonModalElement =
      await this.modalCtrl.create({
        component: UserFeedBackPage,
        componentProps: {
          aParameter: true,
        }
      });
      modal.present();

      modal.onDidDismiss().then((data: OverlayEventDetail) => {
        this.reloadHistoryTrip();
    
    })
  }
  reloadHistoryTrip() {
    var se = this;
    se.presentLoadingData();
    se.storage.get('auth_token').then(auth_token => {
      if (auth_token) {
        var text = "Bearer " + auth_token;
        var options = {
          method: 'GET',
          url: C.urls.baseUrl.urlMobile +'/api/dashboard/getmytrip?getall=true',
          headers:
          {
            'accept': 'application/json',
            'content-type': 'application/json-patch+json',
            authorization: text
          }
        };
        request(options, function (error, response, body) {
          if(response.statusCode != 200){
            var objError ={
                page: "mytrips",
                func: "getdata",
                message : response.statusMessage,
                content : response.body,
                type: "warning",
                param:  JSON.stringify(options)
              };
            C.writeErrorLog(objError,response);
          }
          if (error) {
            error.page = "mytrips";
            error.func = "getdata";
            error.param =  JSON.stringify(options);
            C.writeErrorLog(error,response);
          }else{
            if(body){
              se.zone.run(() => {
                se.historytripcount = 0;
                se.listHistoryTrips = [];
                
                let lstTrips = JSON.parse(body);
                //List trip đã đi
                if(lstTrips.tripHistory.length >0){
                  lstTrips.tripHistory.forEach(elementHis => {
                    if(elementHis.avatar){
                      let urlavatar = elementHis.avatar.substring(0,elementHis.avatar.length-4);
                      let tail = elementHis.avatar.substring(elementHis.avatar.length-4,elementHis.avatar.length);
                      elementHis.avatar157 = urlavatar + "-" + "110x157" +tail;
                      elementHis.avatar104 = urlavatar + "-" + "110x104" +tail;
                      elementHis.avatar110 = urlavatar + "-" + "110x118" +tail;
                   }else{
                    elementHis.avatar110 = "//cdn1.ivivu.com/iVivu/2018/02/07/15/noimage-110x124.jpg";
                  } 
                    se.listHistoryTrips.push(elementHis);
                    se.historytripcount++;
                    
                  });
                  se.historytripcounttext = " (" + se.historytripcount + ")";
                }
              });
            }else{
              if(response.statusCode != 200){
                se.mytripcount = 0;
                se.historytripcount = 0;
                se.listMyTrips = [];
                se.listHistoryTrips = [];
                se.hasdata = false;
                se.hasloaddata = true;
                se.hideloader();
                //se.showConfirm();
              }
            }
            
          }
          
        });
      }else{
        se.hasdata = false;
        se.hasloaddata = true;
        se.listMyTrips = [];
        se.listHistoryTrips = [];
        se.mytripcount = 0;
                se.historytripcount = 0;
        se.hideloader();
      }
    });
    setTimeout(()=>{
      if(se.myloader){
        se.myloader.dismiss();
      }
    },500)
  }
    // var se = this;
    // var options = {
    //   method: 'GET',
    //   url: 'https://beta-svc3.ivivu.com/api/review',
    //   qs: { BookingId: trip.booking_id },
    //   headers:
    //   { 
    //     'cache-control': 'no-cache'
    //   }
    // };

    checkItemHasNotClaim(listItem){
      var res = false;
      listItem.forEach(element => {
        if(!element.isClaim){
          res = true;
          return;
        }
      });
      return res;
    }

  openWebpage(url: string) {
    const options: InAppBrowserOptions = {
      zoom: 'no',
      location: 'yes',
      toolbar: 'yes',
      hideurlbar: 'yes',
      closebuttoncaption: 'Đóng'
    };
    const browser = this.iab.create(url, '_self', options);
    browser.show();
  }

  loadUserReviews() {
    var se = this;
    se.storage.get('auth_token').then(auth_token => {
      if (auth_token) {
        var text = "Bearer " + auth_token;
        var options = {
          method: 'GET',
          url: C.urls.baseUrl.urlMobile + '/api/Dashboard/GetUserReviews',
          timeout: 10000, maxAttempts: 5, retryDelay: 2000,
          headers:
          {
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            authorization: text
          },
          //body: JSON.stringify({file: this.photos})
        };
        request(options, function (error, response, body) {
          if (response.statusCode != 200) {
            var objError = {
              page: "userreviews",
              func: "loadUserReviews",
              message: response.statusMessage,
              content: response.body,
              type: "warning",
              param: JSON.stringify(options)
            };
            C.writeErrorLog(objError,response);
          }
          if (error) {
            error.page = "userreviews";
            error.func = "loadUserReviews";
            error.param = JSON.stringify(options);
            C.writeErrorLog(error,response);
          } else {
            if (body) {
              var result = JSON.parse(body);
              se.arrHotelReviews = [];

              if (result.data && result.data.length > 0) {
                se.zone.run(() => {
                  result.data.forEach(element => {
                    if (element.images && element.images.length > 0) {
                      element.images.forEach(img => {
                        img.thumpUrl = img.thumpUrl.replace("84x84", "150x150");
                      });
                    }
                    se.arrHotelReviews.push(element);
                  });
                })
                //bind lại điểm đánh giá
                se.bindUserReviews();
              }
            } else if (response.statusCode == 401) {
              //se.showConfirm();
            }
          }
        })
      }
    })
  }

  bindUserReviews() {
    var se = this;
    if (se.arrHotelReviews && se.arrHotelReviews.length > 0) {
      se.arrHotelReviews.forEach((item) => {
        var itemReview = se.listMyTrips.filter((element) => {
          return element.booking_id == item.bookingId && item.hotelId == element.HotelIdERP;
        })
        if (itemReview && itemReview.length > 0) {
          se.zone.run(() => {
            item.reviewLink = 'manualBindReview';
            item.reviewPoint = itemReview[0].reviewPoint;
            item.reviewPoint = itemReview[0].reviewPoint;
          })
        }
      })
    }
  }

  async showReviews(trip: any) {
    //this.navCtrl.navigateForward('/userreviews');
    var se = this;
      se.gf.setParams({trip: trip, hotelreviewlist: se.arrHotelReviews},'hotelreviewlist');
      const modal: HTMLIonModalElement =
          await se.modalCtrl.create({
            component: UserReviewsPage,
          });
        modal.present();
  }

  async checkBookingReview(trip): Promise<any>{
    var se = this;
    var result = false;
    return new Promise((resolve, reject) => {
    se.storage.get('auth_token').then(auth_token => {
        if (auth_token) {
          var text = "Bearer " + auth_token;
          var headerobj =
          {
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            authorization: text
          }
        
            se.gf.RequestApi('GET',C.urls.baseUrl.urlSVC3+'review?BookingId='+trip.booking_id, null, null, 'MyTrip', 'CheckBookingReview').then( (data:any) =>{
              if(data){
                //Trả về isSuccess = true => chưa review
                //Trả về false => đã review hoặc có lỗi
                data = JSON.parse(data);
                result = data.isSuccess && !data.isReview;
                resolve(result);
              }
            });
        }
      })
    })
  }

  /**
     * Load thông báo của user
     */
    loadUserNotificationAndMapFlightChange(){
      var se = this;
      if (!se.networkProvider.isOnline()) {
        se.gf.showWarning('Không có kết nối mạng', 'Vui lòng kết nối mạng để sử dụng các tính năng của ứng dụng', 'Đóng');
        return;
      }
      se.storage.get('auth_token').then(auth_token => {
          if (auth_token) {
              var text = "Bearer " + auth_token;
              var options = {
              method: 'GET',
              url: C.urls.baseUrl.urlMobile +'/mobile/OliviaApis/GetNotificationByUser',
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
                      if(data && data.length >0 && se.listMyTrips.length >0){
                        se.listMyTrips.forEach((el)=>{
                          //Lấy ra object notify theo loại noti thay đổi chuyến bay và có trong listmytrip
                          var objnoti = data.filter( (item,index) =>{ 
                            return item.bookingCode == el.booking_id && item.notifyAction == 'flychangeinfo';
                          });
                              if(objnoti && objnoti.length>0){
                                objnoti.forEach((itemnotify:any)=>{
                                      //Lấy ra index của object mytrip theo số bkg
                                      var idx = se.listMyTrips.findIndex((el)=>{ return el.booking_id == itemnotify.bookingCode});
                                      var objmap = se.listMyTrips[idx];
                                      if(itemnotify.switchObj){
                                        var objFlightChange = itemnotify.switchObj.split('|');
                                        //bind lại thông tin chuyến bay thay đổi
                                        // if(objmap && objmap.bookingsComboData && objmap.bookingsComboData.length >0){
                                        //   var olbFlightObject = objFlightChange[0].split(' ');
                                        //   if(olbFlightObject && olbFlightObject.length >=3){
                                        //     let fn = olbFlightObject[0] + ' ' + olbFlightObject[1];
                                        //     if(objmap.bookingsComboData[0].flightNumner == fn){
                                        //       objmap.bookingsComboData[0].changeFlightInfo = true;
                                        //       objmap.bookingsComboData[0].newFlightTime = olbFlightObject[olbFlightObject.length -1];
                                        //     }
                                        //     if(objmap.bookingsComboData[1].flightNumner == fn){
                                        //       objmap.bookingsComboData[1].changeFlightInfo = true;
                                        //       objmap.bookingsComboData[1].newFlightTime = olbFlightObject[olbFlightObject.length -1];
                                        //     }
                                        //   }else{
                                           
                                        //     if(objmap.bookingsComboData[0].flightNumner == objFlightChange[0]){
                                        //       objmap.bookingsComboData[0].changeFlightInfo = true;
                                        //       objmap.bookingsComboData[0].newFlightTime = objFlightChange[1];
                                        //     }
                                        //     if(objmap.bookingsComboData[1].flightNumner == objFlightChange[0]){
                                        //       objmap.bookingsComboData[1].changeFlightInfo = true;
                                        //       objmap.bookingsComboData[1].newFlightTime = objFlightChange[1];
                                        //     }
                                        //   }
                                        // }
                                        if(objmap && objmap.bookingsComboData && objmap.bookingsComboData.length >0){
                                          var newFlightObject = objFlightChange[1].split(' ');
                                          var oldFlightObjectOldTime = objFlightChange[0].split(' ');
                                          if(newFlightObject && newFlightObject.length >3){
                                            let fn = newFlightObject[0] +' '+ newFlightObject[1];
                                            if(objmap.bookingsComboData[0].flightNumner == fn){
                                              objmap.bookingsComboData[0].changeFlightInfo = true;
                                              objmap.bookingsComboData[0].oldFlightTime = oldFlightObjectOldTime[oldFlightObjectOldTime.length-1];
                                              objmap.bookingsComboData[0].departureTime = newFlightObject[newFlightObject.length-1];
                                            }
                                            if(objmap.bookingsComboData[1] && objmap.bookingsComboData[1].flightNumner == fn){
                                              objmap.bookingsComboData[1].changeFlightInfo = true;
                                              objmap.bookingsComboData[1].oldFlightTime = oldFlightObjectOldTime[oldFlightObjectOldTime.length-1];
                                              objmap.bookingsComboData[1].departureTime = newFlightObject[newFlightObject.length-1];
                                            }
                                          }else if(newFlightObject && newFlightObject.length >2){
                                            let fn = newFlightObject[0];
                                            if(objmap.bookingsComboData[0].flightNumner == fn){
                                              objmap.bookingsComboData[0].changeFlightInfo = true;
                                              objmap.bookingsComboData[0].oldFlightTime = oldFlightObjectOldTime[oldFlightObjectOldTime.length-1];
                                              objmap.bookingsComboData[0].departureTime = newFlightObject[newFlightObject.length-1];
                                            }
                                            if(objmap.bookingsComboData[1] && objmap.bookingsComboData[1].flightNumner == fn){
                                              objmap.bookingsComboData[1].changeFlightInfo = true;
                                              objmap.bookingsComboData[1].oldFlightTime = oldFlightObjectOldTime[oldFlightObjectOldTime.length-1];
                                              objmap.bookingsComboData[1].departureTime = newFlightObject[newFlightObject.length-1];
                                            }
                                          }
                                          
                                        }
                                        
                                      }
                                  })
                              }
                          })
                      }
                  }
              }
              });
          }
      })
  }
  
  async presentPopoverHis(ev: any, trip) {
    var se = this;
    const popover = await this.popoverController.create({
      component: InsurrancepopoverPage,
      event: ev,
      translucent: true,
      cssClass: 'popover-history'
    });
    se.valueGlobal.popover=popover;
    var arrinsurranceHis = [];
    let bkgflyinfo = JSON.parse(trip.booking_json_data);
    var departFlightNumber = '',returnFlightNumber='';
    var bookingsComboData = [];
    //se.listClaimed = [];
        if(bkgflyinfo && bkgflyinfo.length >1){
          departFlightNumber = bkgflyinfo[0].FlightNumner;
          returnFlightNumber = bkgflyinfo[1].FlightNumner;
          let obj = {departureDate : bkgflyinfo[0].DepartureDate,
             departureTime : bkgflyinfo[0].DepartureTime,
              departCode: bkgflyinfo[0].DepartCode,
               arrivalCode: bkgflyinfo[0].ArrivalCode,
              flightNumber: bkgflyinfo[0].FlightNumner,
              flightNumner: bkgflyinfo[0].FlightNumner,
              flightFrom: bkgflyinfo[0].FlightFrom,
              flightTo: bkgflyinfo[0].FlightTo,
              airlineName: bkgflyinfo[0].AirlineName };
              bookingsComboData.push(obj);
              let obj1 = {};
              if(bkgflyinfo.length >1){
                obj1 = {departureDate : bkgflyinfo[1].DepartureDate,
                  departureTime : bkgflyinfo[1].DepartureTime,
                   departCode: bkgflyinfo[1].DepartCode,
                    arrivalCode: bkgflyinfo[1].ArrivalCode,
                    flightNumber: bkgflyinfo[1].FlightNumner,
                    flightNumner: bkgflyinfo[0].FlightNumner,
                    flightFrom: bkgflyinfo[1].FlightFrom,
                    flightTo: bkgflyinfo[1].FlightTo,
                    airlineName: bkgflyinfo[1].AirlineName};
                    bookingsComboData.push(obj1);
              }
        }
    trip.bookingsComboData = bookingsComboData;
    trip.insuranceInfo.adultList.forEach(element => {
      let claimed = false,claimedDepart=false, claimedReturn=false;
      if(element.claimedFlights && element.claimedFlights.length >0){
        element.claimedFlights.forEach((fn)=>{
          se.listClaimed.push({flight_number: fn.replace(" ",""), insurance_code: element.id, bookingid: trip.booking_id});
        })
      }

      let fnDepart =departFlightNumber.replace(" ",""),
      fnReturn = returnFlightNumber.replace(" ","");
      if(se.listClaimed && se.listClaimed.length >0){
        // claimed = se.listClaimed.filter((item)=>{ return item.insurance_code == element.id && item.bookingid == trip.booking_id}).length >1 ? true : false;
        // claimedDepart = se.listClaimed.filter((el)=>{return el.flight_number ==  fnDepart && el.insurance_code == element.id && el.bookingid == trip.booking_id}).length >0 ? true : false;
        // claimedReturn = se.listClaimed.filter((el)=>{return el.flight_number ==  fnReturn && el.insurance_code == element.id && el.bookingid == trip.booking_id}).length >0 ? true : false;
        var listclaim = se.listClaimed.filter((item)=>{ return item.insurance_code == element.id && item.bookingid == trip.booking_id});
        var listuniqueclaimed = [];
        if(listclaim && listclaim.length >0){
          listclaim.forEach(element => {
            if(listuniqueclaimed.length ==0){
              listuniqueclaimed.push(element);
            }else{
              var bexists = listuniqueclaimed.filter((el)=>{ return el.flight_number == element.flight_number}).length >0 ? true : false;
              if(!bexists){
                listuniqueclaimed.push(element);
              }
            }
        });
        }
            
        claimed = listuniqueclaimed.length >1 ? true : false;

        var listclaimdepart = se.listClaimed.filter((el)=>{ return el.flight_number ==  fnDepart && el.insurance_code == element.id && el.bookingid == trip.booking_id});
        var listuniqueclaimdepart = [];
        if(listclaimdepart && listclaimdepart.length >0){
          listclaimdepart.forEach(element => {
                if(listuniqueclaimdepart.length ==0){
                  listuniqueclaimdepart.push(element);
                }else{
                  var bexists = listuniqueclaimdepart.filter((el)=>{ return el.flight_number == element.flight_number}).length >0 ? true : false;
                  if(!bexists){
                    listuniqueclaimdepart.push(element);
                  }
                }
            });
        }
        claimedDepart = listuniqueclaimdepart.length >1 ? true : false;

        var listclaimreturn = se.listClaimed.filter((el)=>{ return el.flight_number ==  fnReturn && el.insurance_code == element.id && el.bookingid == trip.booking_id});
        var listuniqueclaimreturn = [];
        if(listclaimreturn && listclaimreturn.length >0){
        listclaimreturn.forEach(element => {
              if(listuniqueclaimreturn.length ==0){
                listuniqueclaimreturn.push(element);
              }else{
                var bexists = listuniqueclaimreturn.filter((el)=>{ return el.flight_number == element.flight_number}).length >0 ? true : false;
                if(!bexists){
                  listuniqueclaimreturn.push(element);
                }
              }
          });
        }
        claimedReturn = listuniqueclaimreturn.length >1 ? true : false;

      }
      //Nếu chưa có tron listclaimed thì kiểm tra tiếp trong list chuyến bay ban đầu(cho trường hợp hủy chuyến)
      if(se.listClaimedFlightOriginal && se.listClaimedFlightOriginal.length >0){
        if(!claimedDepart){
          claimedDepart = se.listClaimedFlightOriginal.filter((el)=>{return el.flight_number ==  fnDepart && el.insurance_code == element.insurance_code && el.bookingid == trip.booking_id}).length >0 ? true : false;
        }
        if(!claimedReturn){
          claimedReturn = se.listClaimedFlightOriginal.filter((el)=>{return el.flight_number ==  fnReturn && el.insurance_code == element.insurance_code && el.bookingid == trip.booking_id}).length >0 ? true : false;
        }
      }
      var itemAdult= {claimed: claimed ,insurance_code: element.id,customer_name: element.name, customer_id: element.identification, customer_address: element.address, customer_dob: element.birth, claimedDepart: claimedDepart, claimedReturn: claimedReturn}
      arrinsurranceHis.push(itemAdult);
    });

    let listChild = [];
    trip.insuranceInfo.childList.forEach(element => {
      let claimed = false,claimedDepart=false, claimedReturn=false;
      if(element.claimedFlights && element.claimedFlights.length >0){
        element.claimedFlights.forEach((fn)=>{
          if(!se.checkExitClaim(se.listClaimed, element, trip.booking_id)){
            se.listClaimed.push({flight_number: fn, insurance_code: element.id, bookingid: trip.booking_id});
          }
        })
      }

      let fnDepart =departFlightNumber.replace(" ",""),
            fnReturn = returnFlightNumber.replace(" ","");
      if(se.listClaimed && se.listClaimed.length >0){
        // claimed = se.listClaimed.filter((item)=>{ return item.insurance_code == element.id && item.bookingid == trip.booking_id}).length >1 ? true : false;
        // claimedDepart = se.listClaimed.filter((el)=>{return el.flight_number ==  fnDepart && el.insurance_code == element.id && el.bookingid == trip.booking_id}).length >0 ? true : false;
        // claimedReturn = se.listClaimed.filter((el)=>{return el.flight_number ==  fnReturn && el.insurance_code == element.id && el.bookingid == trip.booking_id}).length >0 ? true : false;
          var listclaim = se.listClaimed.filter((item)=>{ return item.insurance_code == element.id && item.bookingid == trip.booking_id});
          var listuniqueclaimed = [];
              listclaim.forEach(element => {
                if(listuniqueclaimed.length ==0){
                  listuniqueclaimed.push(element);
                }else{
                  var bexists = listuniqueclaimed.filter((el)=>{ return el.flight_number == element.flight_number}).length >0 ? true : false;
                  if(!bexists){
                    listuniqueclaimed.push(element);
                  }
                }
            });
          claimed = listuniqueclaimed.length >1 ? true : false;

          var listclaimdepart = se.listClaimed.filter((el)=>{ return el.flight_number ==  fnDepart && el.insurance_code == element.id && el.bookingid == trip.booking_id});
          var listuniqueclaimdepart = [];
          listclaimdepart.forEach(element => {
                if(listuniqueclaimdepart.length ==0){
                  listuniqueclaimdepart.push(element);
                }else{
                  var bexists = listuniqueclaimdepart.filter((el)=>{ return el.flight_number == element.flight_number}).length >0 ? true : false;
                  if(!bexists){
                    listuniqueclaimdepart.push(element);
                  }
                }
            });
          claimedDepart = listuniqueclaimdepart.length >1 ? true : false;

          var listclaimreturn = se.listClaimed.filter((el)=>{ return el.flight_number ==  fnReturn && el.insurance_code == element.id && el.bookingid == trip.booking_id});
          var listuniqueclaimreturn = [];
          listclaimreturn.forEach(element => {
                if(listuniqueclaimreturn.length ==0){
                  listuniqueclaimreturn.push(element);
                }else{
                  var bexists = listuniqueclaimreturn.filter((el)=>{ return el.flight_number == element.flight_number}).length >0 ? true : false;
                  if(!bexists){
                    listuniqueclaimreturn.push(element);
                  }
                }
            });
          claimedReturn = listuniqueclaimreturn.length >1 ? true : false;
      }
      //Nếu chưa có tron listclaimed thì kiểm tra tiếp trong list chuyến bay ban đầu(cho trường hợp hủy chuyến)
      if(se.listClaimedFlightOriginal && se.listClaimedFlightOriginal.length >0){
        if(!claimedDepart){
          claimedDepart = se.listClaimedFlightOriginal.filter((el)=>{return el.flight_number ==  fnDepart && el.insurance_code == element.insurance_code && el.bookingid == trip.booking_id}).length >0 ? true : false;
        }
        if(!claimedReturn){
          claimedReturn = se.listClaimedFlightOriginal.filter((el)=>{return el.flight_number ==  fnReturn && el.insurance_code == element.insurance_code && el.bookingid == trip.booking_id}).length >0 ? true : false;
        }
      }
      var itemchild= {claimed: claimed ,insurance_code: element.id,customer_name: element.name, customer_id: element.identification, customer_address: element.address, customer_dob: element.birth, claimedDepart: claimedDepart, claimedReturn: claimedReturn}
      se.arrchildinsurrance.push(itemchild);
      listChild.push(element);
    });

    se.gf.setParams({ childlist: listChild, trip: trip, listInsurrance: arrinsurranceHis,departFlightNumber:departFlightNumber, returnFlightNumber: returnFlightNumber, listClaimed: se.listClaimed  }, 'insurrenceHistory' );
    return await popover.present();
  }

  /**
   * Show popup claim bảo hiểm
   * @param trip thông tin chuyến đi
   * @param item thông tin bảo hiểm
   * @param type loại bảo hiểm (1 - trễ chiều đi; 2 - trễ chiều về; 3 - hủy chiều đi; 4 - hủy chiều về)
   * @param flightNumner số hiệu chuyến bay
   */
  async showInsuranceDetail(trip, item, type, flightNumber, ischild){
    var se = this;
    
    se.gf.setParams({ trip: trip, currentTrip: se.currentTrip }, 'mytripbookingdetail');
    let listChild = [];
    //Lọc lại những item child chưa được claim
    se.arrchild.forEach(element => {
      let hadclaimed = false;
      if(se.listClaimed && se.listClaimed.length >0){
        hadclaimed = se.listClaimed.filter((el)=>{return el.flight_number ==  flightNumber.replace(" ","") && element.id == el.insurance_code  && el.bookingid == trip.booking_id}).length >0 ? true : false;
      }
      if(!hadclaimed){
        listChild.push(element);
      }
    });

    if(ischild && listChild.length <=1){
      listChild = [];
    }
    
    se.gf.setParams({ childlist: listChild, item: item, trip: trip,type: type, flightNumber: flightNumber, ischild: ischild }, 'insurrenceDetail' );
    se.router.navigateByUrl("/insurrancedetail");
  }

  /**
   * Show option chọn claim bảo hiểm
   * @param trip thông tin chuyến đi
   * @param item thông tin bảo hiểm
   */
  async showActionSheetInsurrance(trip, item, ischild){
    var se = this;
    let claimedDepart = false, claimedReturn = false;
      if(se.listClaimed && se.listClaimed.length >0){
        let fnDepart = se.cincombodepartureflightnumberdisplay.replace(" ",""),
            fnReturn = se.cincomboarrivalflightnumberdisplay.replace(" ","");
        claimedDepart = se.listClaimed.filter((el)=>{return el.flight_number ==  fnDepart && el.insurance_code == item.insurance_code}).length >0 ? true : false;
        claimedReturn = se.listClaimed.filter((el)=>{return el.flight_number ==  fnReturn && el.insurance_code == item.insurance_code}).length >0 ? true : false;
  
        //Nếu chưa có tron listclaimed thì kiểm tra tiếp trong list chuyến bay ban đầu(cho trường hợp hủy chuyến)
        if(se.listClaimedFlightOriginal && se.listClaimedFlightOriginal.length >0){
          if(!claimedDepart){
            claimedDepart = se.listClaimedFlightOriginal.filter((el)=>{return el.flight_number.replace(" ","") ==  fnDepart && el.insurance_code == item.insurance_code && el.bookingid == trip.booking_id}).length >0 ? true : false;
          }
          if(!claimedReturn){
            claimedReturn = se.listClaimedFlightOriginal.filter((el)=>{return el.flight_number.replace(" ","") ==  fnReturn && el.insurance_code == item.insurance_code && el.bookingid == trip.booking_id}).length >0 ? true : false;
          }
        }
      }
      let actionSheet = await se.actionsheetCtrl.create({
        cssClass: 'action-sheets-insurrance',
        buttons: [
          {
            text: "Trễ chuyến "+se.cincombodepartureflightnumberdisplay + "| " + se.departCodeDisplay,
            handler: () => {
              claimedDepart ? se.showWarning('Chuyến bay này đã được yêu cầu bảo hiểm. Xin vui lòng chọn lại.') : se.showInsuranceDetail(trip, item,1, se.cincombodepartureflightnumberdisplay, ischild);
            },
            cssClass: claimedDepart ? 'has-claimed' : '',
          },
          {
            text: "Trễ chuyến "+se.cincomboarrivalflightnumberdisplay + "| " + se.arrivalCodeDisplay,
            handler: () => {
              claimedReturn ? se.showWarning('Chuyến bay này đã được yêu cầu bảo hiểm. Xin vui lòng chọn lại.') : se.showInsuranceDetail(trip, item,2, se.cincomboarrivalflightnumberdisplay, ischild);
            },
            cssClass: claimedReturn ? 'has-claimed' : '',
          },
          {
            text: "Hủy chuyến "+se.cincombodepartureflightnumberdisplay + "| " + se.departCodeDisplay,
            handler: () => {
              claimedDepart ? se.showWarning('Chuyến bay này đã được yêu cầu bảo hiểm. Xin vui lòng chọn lại.') : se.showInsuranceDetail(trip, item,3, se.cincombodepartureflightnumberdisplay, ischild);
            },
            cssClass: claimedDepart ? 'has-claimed' : '',
          },
          {
            text: "Hủy chuyến "+se.cincomboarrivalflightnumberdisplay + "| " + se.arrivalCodeDisplay,
            handler: () => {
              claimedReturn ? se.showWarning('Chuyến bay này đã được yêu cầu bảo hiểm. Xin vui lòng chọn lại.') : se.showInsuranceDetail(trip, item,4, se.cincomboarrivalflightnumberdisplay, ischild);
            },
            cssClass: claimedReturn ? 'has-claimed' : '',
          },
        ]
      });
      actionSheet.present();
  }

  async showWarning(msg){
    var se = this;
    const toast = await se.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top',
    });
    toast.present();
  }

  refreshToken() {
    var se = this;
    if(se.reloadcount >10){
      return;
    }
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
            error.page = "tab3";
            error.func = "refreshToken";
            error.param = JSON.stringify(options);
            C.writeErrorLog(error,response);
          } else {
            var json=JSON.parse(body);
            if (json.auth_token) {
              se.storage.remove('auth_token');
              se.storage.set("auth_token", json.auth_token);
              se.getdata(json.auth_token);
            }
          }
        })
      }
    })
    se.reloadcount ++;
  }

  showInsurranceInfo(){
    var se = this;
    se.gf.setParams({ currentTrip: se.currentTrip }, 'mytripbookingdetail');
    se.router.navigateByUrl('/insurrancenote');
  }
  
  /**
   * Refresh lại thông tin bảo hiểm đã claim
   * @param bkgid id bkg đã claim bảo hiểm
   */
  public async refreshInsurranceInfo(): Promise<void>{
    var se = this;
    let objClaimed = se.activityService.objClaimed;
    if(objClaimed){
      // if(!se.listClaimed){
      //   se.listClaimed = [];
      // }
      if(!se.listClaimedFlightOriginal){
        se.listClaimedFlightOriginal = [];
      }
   
        let fn = objClaimed.flightNumber.replace(" ","");
        var objcheck = {flight_number: fn , insurance_code: objClaimed.code, bookingid : se.activityService.insurranceBookingId};
        if(!se.checkExitClaim(se.listClaimed,objcheck, se.activityService.insurranceBookingId)){
          se.listClaimed.push(objcheck);
          if(objClaimed.flightNumberOriginal){
            se.listClaimedFlightOriginal.push({flight_number: objClaimed.flightNumberOriginal , insurance_code: objClaimed.code, bookingid : se.activityService.insurranceBookingId});
          }
        }
        
        if(objClaimed.listchildclaimed && objClaimed.listchildclaimed.length >0){
          objClaimed.listchildclaimed.forEach(element => {
            var objChildcheck = {flight_number: fn , insurance_code: element.code};
            if(!se.checkExitClaim(se.listClaimed,objChildcheck, se.activityService.insurranceBookingId)){
              se.listClaimed.push(objChildcheck);
              if(objClaimed.flightNumberOriginal){
                se.listClaimedFlightOriginal.push({flight_number: objClaimed.flightNumberOriginal , insurance_code: element.code, bookingid : se.activityService.insurranceBookingId});
              }
            }
          });
        }
    }
    
  }

  doRefresh(event){
    var se = this;
    se.getdata(null);
    setTimeout(() => {
      event.target.complete();
    }, 1000)
  }

  refreshData(){
    var se = this;
    se.presentLoadingData();
    se.getdata(null);
  }
}
