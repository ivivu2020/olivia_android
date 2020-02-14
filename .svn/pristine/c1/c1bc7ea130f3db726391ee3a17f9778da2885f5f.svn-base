var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { IonicNativePlugin, cordova } from '@ionic-native/core';
var FirebaseAnalytics = /** @class */ (function (_super) {
    __extends(FirebaseAnalytics, _super);
    function FirebaseAnalytics() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FirebaseAnalytics.prototype.logEvent = function (name, params) { return cordova(this, "logEvent", { "sync": true }, arguments); };
    FirebaseAnalytics.prototype.setUserId = function (id) { return cordova(this, "setUserId", { "sync": true }, arguments); };
    FirebaseAnalytics.prototype.setUserProperty = function (name, value) { return cordova(this, "setUserProperty", { "sync": true }, arguments); };
    FirebaseAnalytics.prototype.setEnabled = function (enabled) { return cordova(this, "setEnabled", { "sync": true }, arguments); };
    FirebaseAnalytics.prototype.setCurrentScreen = function (name) { return cordova(this, "setCurrentScreen", { "sync": true }, arguments); };
    FirebaseAnalytics.pluginName = "FirebaseAnalytics";
    FirebaseAnalytics.plugin = "cordova-plugin-firebase-analytics";
    FirebaseAnalytics.pluginRef = "cordova.plugins.firebase.analytics";
    FirebaseAnalytics.repo = "https://github.com/chemerisuk/cordova-plugin-firebase-analytics";
    FirebaseAnalytics.platforms = ["Android", "iOS"];
    FirebaseAnalytics = __decorate([
        Injectable()
    ], FirebaseAnalytics);
    return FirebaseAnalytics;
}(IonicNativePlugin));
export { FirebaseAnalytics };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvQGlvbmljLW5hdGl2ZS9wbHVnaW5zL2ZpcmViYXNlLWFuYWx5dGljcy9uZ3gvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyw4QkFBc0MsTUFBTSxvQkFBb0IsQ0FBQzs7SUFtQ2pDLHFDQUFpQjs7OztJQVN0RCxvQ0FBUSxhQUFDLElBQVksRUFBRSxNQUFXO0lBV2xDLHFDQUFTLGFBQUMsRUFBVTtJQVlwQiwyQ0FBZSxhQUFDLElBQVksRUFBRSxLQUFhO0lBVTNDLHNDQUFVLGFBQUMsT0FBZ0I7SUFXM0IsNENBQWdCLGFBQUMsSUFBWTs7Ozs7O0lBckRsQixpQkFBaUI7UUFEN0IsVUFBVSxFQUFFO09BQ0EsaUJBQWlCOzRCQXBDOUI7RUFvQ3VDLGlCQUFpQjtTQUEzQyxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb3Jkb3ZhLCBJb25pY05hdGl2ZVBsdWdpbiwgUGx1Z2luIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9jb3JlJztcblxuLyoqXG4gKiBAYmV0YVxuICogQG5hbWUgRmlyZWJhc2UgQW5hbHl0aWNzXG4gKiBAZGVzY3JpcHRpb25cbiAqIENvcmRvdmEgcGx1Z2luIGZvciBGaXJlYmFzZSBBbmFseXRpY3NcbiAqXG4gKiBHbyB0byBmaXJlYmFzZSBjb25zb2xlIGFuZCBleHBvcnQgZ29vZ2xlLXNlcnZpY2VzLmpzb24gYW5kIEdvb2dsZVNlcnZpY2UtSW5mby5wbGlzdC4gUHV0IHRob3NlIGZpbGVzIGludG8gdGhlIHJvb3Qgb2YgeW91ciBjb3Jkb3ZhIGFwcCBmb2xkZXIuXG4gKlxuICogTk9URTogb24gaU9TIGluIG9yZGVyIHRvIGNvbGxlY3QgZGVtb2dyYXBoaWMsIGFnZSwgZ2VuZGVyIGRhdGEgZXRjLiB5b3Ugc2hvdWxkIGFkZGl0aW9uYWxseSBpbmNsdWRlIEFkU3VwcG9ydC5mcmFtZXdvcmsgaW50byB5b3VyIHByb2plY3QuXG4gKlxuICogQHVzYWdlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBGaXJlYmFzZUFuYWx5dGljcyB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvZmlyZWJhc2UtYW5hbHl0aWNzL25neCc7XG4gKlxuICpcbiAqIGNvbnN0cnVjdG9yKHByaXZhdGUgZmlyZWJhc2VBbmFseXRpY3M6IEZpcmViYXNlQW5hbHl0aWNzKSB7IH1cbiAqXG4gKiAuLi5cbiAqXG4gKiB0aGlzLmZpcmViYXNlQW5hbHl0aWNzLmxvZ0V2ZW50KCdwYWdlX3ZpZXcnLCB7cGFnZTogXCJkYXNoYm9hcmRcIn0pXG4gKiAgIC50aGVuKChyZXM6IGFueSkgPT4gY29uc29sZS5sb2cocmVzKSlcbiAqICAgLmNhdGNoKChlcnJvcjogYW55KSA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XG4gKlxuICogYGBgXG4gKi9cbkBQbHVnaW4oe1xuICBwbHVnaW5OYW1lOiAnRmlyZWJhc2VBbmFseXRpY3MnLFxuICBwbHVnaW46ICdjb3Jkb3ZhLXBsdWdpbi1maXJlYmFzZS1hbmFseXRpY3MnLFxuICBwbHVnaW5SZWY6ICdjb3Jkb3ZhLnBsdWdpbnMuZmlyZWJhc2UuYW5hbHl0aWNzJyxcbiAgcmVwbzogJ2h0dHBzOi8vZ2l0aHViLmNvbS9jaGVtZXJpc3VrL2NvcmRvdmEtcGx1Z2luLWZpcmViYXNlLWFuYWx5dGljcycsXG4gIHBsYXRmb3JtczogWydBbmRyb2lkJywgJ2lPUyddXG59KVxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZpcmViYXNlQW5hbHl0aWNzIGV4dGVuZHMgSW9uaWNOYXRpdmVQbHVnaW4ge1xuICAvKipcbiAgICogTG9ncyBhbiBhcHAgZXZlbnQuXG4gICAqIEJlIGF3YXJlIG9mIGF1dG9tYXRpY2FsbHkgY29sbGVjdGVkIGV2ZW50cy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50XG4gICAqIEBwYXJhbSB7YW55fSBwYXJhbXMgU29tZSBwYXJhbSB0byBjb25maWd1cmUgc29tZXRoaW5nXG4gICAqIEByZXR1cm4ge1Byb21pc2U8YW55Pn0gUmV0dXJucyBhIHByb21pc2VcbiAgICovXG4gIEBDb3Jkb3ZhKHsgc3luYzogdHJ1ZSB9KVxuICBsb2dFdmVudChuYW1lOiBzdHJpbmcsIHBhcmFtczogYW55KTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdXNlciBJRCBwcm9wZXJ0eS5cbiAgICogVGhpcyBmZWF0dXJlIG11c3QgYmUgdXNlZCBpbiBhY2NvcmRhbmNlIHdpdGggR29vZ2xlJ3MgUHJpdmFjeSBQb2xpY3kuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBUaGUgdXNlciBJRFxuICAgKiBAcmV0dXJuIHtQcm9taXNlPGFueT59IFJldHVybnMgYSBwcm9taXNlXG4gICAqL1xuICBAQ29yZG92YSh7IHN5bmM6IHRydWUgfSlcbiAgc2V0VXNlcklkKGlkOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGZlYXR1cmUgbXVzdCBiZSB1c2VkIGluIGFjY29yZGFuY2Ugd2l0aCBHb29nbGUncyBQcml2YWN5IFBvbGljeS5cbiAgICogQmUgYXdhcmUgb2YgYXV0b21hdGljYWxseSBjb2xsZWN0ZWQgdXNlciBwcm9wZXJ0aWVzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgcHJvcGVydHkgbmFtZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgVGhlIHByb3BlcnR5IHZhbHVlXG4gICAqIEByZXR1cm4ge1Byb21pc2U8YW55Pn0gUmV0dXJucyBhIHByb21pc2VcbiAgICovXG4gIEBDb3Jkb3ZhKHsgc3luYzogdHJ1ZSB9KVxuICBzZXRVc2VyUHJvcGVydHkobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB3aGV0aGVyIGFuYWx5dGljcyBjb2xsZWN0aW9uIGlzIGVuYWJsZWQgZm9yIHRoaXMgYXBwIG9uIHRoaXMgZGV2aWNlLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGVuYWJsZWRcbiAgICogQHJldHVybiB7UHJvbWlzZTxhbnk+fSBSZXR1cm5zIGEgcHJvbWlzZVxuICAgKi9cbiAgQENvcmRvdmEoeyBzeW5jOiB0cnVlIH0pXG4gIHNldEVuYWJsZWQoZW5hYmxlZDogYm9vbGVhbik6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGN1cnJlbnQgc2NyZWVuIG5hbWUsIHdoaWNoIHNwZWNpZmllcyB0aGUgY3VycmVudCB2aXN1YWwgY29udGV4dCBpbiB5b3VyIGFwcC5cbiAgICogVGhpcyBoZWxwcyBpZGVudGlmeSB0aGUgYXJlYXMgaW4geW91ciBhcHAgd2hlcmUgdXNlcnMgc3BlbmQgdGhlaXIgdGltZSBhbmQgaG93IHRoZXkgaW50ZXJhY3Qgd2l0aCB5b3VyIGFwcC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIHNjcmVlblxuICAgKiBAcmV0dXJuIHtQcm9taXNlPGFueT59IFJldHVybnMgYSBwcm9taXNlXG4gICAqL1xuICBAQ29yZG92YSh7IHN5bmM6IHRydWUgfSlcbiAgc2V0Q3VycmVudFNjcmVlbihuYW1lOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybjtcbiAgfVxufVxuIl19