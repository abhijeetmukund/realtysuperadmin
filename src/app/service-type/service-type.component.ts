import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PopupComponent } from './../popup/popup.component';
import { EditComponent } from './../edit/edit.component';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { HeaderComponent } from './../header/header.component';
import { NgModel } from '@angular/forms';
import { DatePipe } from "@angular/common";
import { Moment } from 'moment';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';

export interface Listing {
  value: string;
  viewValue: string;
}

export interface Status {
  value: string;
  viewValue: string;
}

export interface cc {
  cctld: string;
  currency: string;
  phonecode: number;
  country_id: number;
  countryname: string;
}

@Component({
  providers:[ HeaderComponent, DatePipe ],
  selector: 'app-service-type',
  templateUrl: './service-type.component.html',
  styleUrls: ['./service-type.component.scss']
})

export class ServiceTypeComponent{

  myControl = new FormControl();
  options: cc[] = [
    {"cctld": "af", "currency": "AFN", "phonecode": 93, "country_id": 1, "countryname": "Afghanistan"},
    {"cctld": "al", "currency": "ALL", "phonecode": 355, "country_id": 2, "countryname": "Albania"},
    {"cctld": "dz", "currency": "DZD", "phonecode": 213, "country_id": 3, "countryname": "Algeria"},
    {"cctld": "as", "currency": "USD", "phonecode": 1684, "country_id": 4, "countryname": "American Samoa"},
    {"cctld": "ad", "currency": "EUR", "phonecode": 376, "country_id": 5, "countryname": "Andorra"},
    {"cctld": "ao", "currency": "AOA", "phonecode": 244, "country_id": 6, "countryname": "Angola"},
    {"cctld": "ai", "currency": "XCD", "phonecode": 1264, "country_id": 7, "countryname": "Anguilla"},
    {"cctld": "ag", "currency": "XCD", "phonecode": 1268, "country_id": 9, "countryname": "Antigua and Barbuda"},
    {"cctld": "ar", "currency": "ARS", "phonecode": 54, "country_id": 10, "countryname": "Argentina"},
    {"cctld": "am", "currency": "AMD", "phonecode": 374, "country_id": 11, "countryname": "Armenia"},
    {"cctld": "aw", "currency": "AWG", "phonecode": 297, "country_id": 12, "countryname": "Aruba"},
    {"cctld": "au", "currency": "AUD", "phonecode": 61, "country_id": 13, "countryname": "Australia"},
    {"cctld": "at", "currency": "EUR", "phonecode": 43, "country_id": 14, "countryname": "Austria"},
    {"cctld": "az", "currency": "AZN", "phonecode": 994, "country_id": 15, "countryname": "Azerbaijan"},
    {"cctld": "bs", "currency": "USD", "phonecode": 1242, "country_id": 16, "countryname": "Bahamas"},
    {"cctld": "bh", "currency": "BHD", "phonecode": 973, "country_id": 17, "countryname": "Bahrain"},
    {"cctld": "bd", "currency": "BDT", "phonecode": 880, "country_id": 18, "countryname": "Bangladesh"},
    {"cctld": "bb", "currency": "BBD", "phonecode": 1246, "country_id": 19, "countryname": "Barbados"},
    {"cctld": "by", "currency": "BYR", "phonecode": 375, "country_id": 20, "countryname": "Belarus"},
    {"cctld": "be", "currency": "EUR", "phonecode": 32, "country_id": 21, "countryname": "Belgium"},
    {"cctld": "bz", "currency": "BZD", "phonecode": 501, "country_id": 22, "countryname": "Belize"},
    {"cctld": "bj", "currency": "XOF", "phonecode": 229, "country_id": 23, "countryname": "Benin"},
    {"cctld": "bm", "currency": "BMD", "phonecode": 1441, "country_id": 24, "countryname": "Bermuda"},
    {"cctld": "bt", "currency": "INR", "phonecode": 975, "country_id": 25, "countryname": "Bhutan"},
    {"cctld": "bo", "currency": "BOV", "phonecode": 591, "country_id": 26, "countryname": "Bolivia"},
    {"cctld": "ba", "currency": "BAM", "phonecode": 387, "country_id": 27, "countryname": "Bosnia and Herzegovina"},
    {"cctld": "bw", "currency": "BWP", "phonecode": 267, "country_id": 28, "countryname": "Botswana"},
    {"cctld": "bv", "currency": "NOK", "phonecode": 0, "country_id": 29, "countryname": "Bouvet Island"},
    {"cctld": "br", "currency": "BRL", "phonecode": 55, "country_id": 30, "countryname": "Brazil"},
    {"cctld": "io", "currency": "USD", "phonecode": 246, "country_id": 31, "countryname": "British Indian Ocean Territory"},
    {"cctld": "bn", "currency": "BND", "phonecode": 673, "country_id": 32, "countryname": "Brunei Darussalam"},
    {"cctld": "bg", "currency": "BGN", "phonecode": 359, "country_id": 33, "countryname": "Bulgaria"},
    {"cctld": "bf", "currency": "XOF", "phonecode": 226, "country_id": 34, "countryname": "Burkina Faso"},
    {"cctld": "bi", "currency": "BIF", "phonecode": 257, "country_id": 35, "countryname": "Burundi"},
    {"cctld": "kh", "currency": "KHR", "phonecode": 855, "country_id": 36, "countryname": "Cambodia"},
    {"cctld": "cm", "currency": "XAF", "phonecode": 237, "country_id": 37, "countryname": "Cameroon"},
    {"cctld": "ca", "currency": "CAD", "phonecode": 1, "country_id": 38, "countryname": "Canada"},
    {"cctld": "cv", "currency": "CVE", "phonecode": 238, "country_id": 39, "countryname": "Cape Verde"},
    {"cctld": "ky", "currency": "KYD", "phonecode": 1345, "country_id": 40, "countryname": "Cayman Islands"},
    {"cctld": "cf", "currency": "XAF", "phonecode": 236, "country_id": 41, "countryname": "Central African Republic"},
    {"cctld": "td", "currency": "XAF", "phonecode": 235, "country_id": 42, "countryname": "Chad"},
    {"cctld": "cl", "currency": "CLP", "phonecode": 56, "country_id": 43, "countryname": "Chile"},
    {"cctld": "cn", "currency": "CNY", "phonecode": 86, "country_id": 44, "countryname": "China"},
    {"cctld": "cx", "currency": "AUD", "phonecode": 61, "country_id": 45, "countryname": "Christmas Island"},
    {"cctld": "cc", "currency": "AUD", "phonecode": 672, "country_id": 46, "countryname": "Cocos (Keeling) Islands"},
    {"cctld": "co", "currency": "COU", "phonecode": 57, "country_id": 47, "countryname": "Colombia"},
    {"cctld": "km", "currency": "KMF", "phonecode": 269, "country_id": 48, "countryname": "Comoros"},
    {"cctld": "cg", "currency": "XAF", "phonecode": 242, "country_id": 49, "countryname": "Republic of the Congo"},
    {"cctld": "cd", "currency": "CDF", "phonecode": 242, "country_id": 50, "countryname": "Democratic Republic of the Congo"},
    {"cctld": "ck", "currency": "NZD", "phonecode": 682, "country_id": 51, "countryname": "Cook Islands"},
    {"cctld": "cr", "currency": "CRC", "phonecode": 506, "country_id": 52, "countryname": "Costa Rica"},
    {"cctld": "ci", "currency": "CFA", "phonecode": 225, "country_id": 53, "countryname": "Cote D'Ivoire"},
    {"cctld": "hr", "currency": "HRK", "phonecode": 385, "country_id": 54, "countryname": "Croatia"},
    {"cctld": "cu", "currency": "CUP", "phonecode": 53, "country_id": 55, "countryname": "Cuba"},
    {"cctld": "cy", "currency": "EUR", "phonecode": 357, "country_id": 56, "countryname": "Cyprus"},
    {"cctld": "cz", "currency": "CZK", "phonecode": 420, "country_id": 57, "countryname": "Czech Republic"},
    {"cctld": "dk", "currency": "DKK", "phonecode": 45, "country_id": 58, "countryname": "Denmark"},
    {"cctld": "dj", "currency": "DJF", "phonecode": 253, "country_id": 59, "countryname": "Djibouti"},
    {"cctld": "dm", "currency": "XCD", "phonecode": 1767, "country_id": 60, "countryname": "Dominica"},
    {"cctld": "do", "currency": "DOP", "phonecode": 1809, "country_id": 61, "countryname": "Dominican Republic"},
    {"cctld": "ec", "currency": "USD", "phonecode": 593, "country_id": 62, "countryname": "Ecuador"},
    {"cctld": "eg", "currency": "EGP", "phonecode": 20, "country_id": 63, "countryname": "Egypt"},
    {"cctld": "sv", "currency": "USD", "phonecode": 503, "country_id": 64, "countryname": "El Salvador"},
    {"cctld": "gq", "currency": "XAF", "phonecode": 240, "country_id": 65, "countryname": "Equatorial Guinea"},
    {"cctld": "er", "currency": "ERN", "phonecode": 291, "country_id": 66, "countryname": "Eritrea"},
    {"cctld": "ee", "currency": "EUR", "phonecode": 372, "country_id": 67, "countryname": "Estonia"},
    {"cctld": "et", "currency": "ETB", "phonecode": 251, "country_id": 68, "countryname": "Ethiopia"},
    {"cctld": "fk", "currency": "FKP", "phonecode": 500, "country_id": 69, "countryname": "Falkland Islands (Malvinas)"},
    {"cctld": "fo", "currency": "KR", "phonecode": 298, "country_id": 70, "countryname": "Faroe Islands"},
    {"cctld": "fj", "currency": "FJD", "phonecode": 679, "country_id": 71, "countryname": "Fiji"},
    {"cctld": "fi", "currency": "EUR", "phonecode": 358, "country_id": 72, "countryname": "Finland"},
    {"cctld": "fr", "currency": "EUR", "phonecode": 33, "country_id": 73, "countryname": "France"},
    {"cctld": "gf", "currency": "EUR", "phonecode": 594, "country_id": 74, "countryname": "French Guiana"},
    {"cctld": "pf", "currency": "XPF", "phonecode": 689, "country_id": 75, "countryname": "French Polynesia"},
    {"cctld": "tf", "currency": "EUR", "phonecode": 0, "country_id": 76, "countryname": "French Southern Territories"},
    {"cctld": "ga", "currency": "XAF", "phonecode": 241, "country_id": 77, "countryname": "Gabon"},
    {"cctld": "gm", "currency": "GMD", "phonecode": 220, "country_id": 78, "countryname": "Gambia"},
    {"cctld": "ge", "currency": "GEL", "phonecode": 995, "country_id": 79, "countryname": "Georgia"},
    {"cctld": "de", "currency": "EUR", "phonecode": 49, "country_id": 80, "countryname": "Germany"},
    {"cctld": "gh", "currency": "GHS", "phonecode": 233, "country_id": 81, "countryname": "Ghana"},
    {"cctld": "gi", "currency": "GIP", "phonecode": 350, "country_id": 82, "countryname": "Gibraltar"},
    {"cctld": "gr", "currency": "EUR", "phonecode": 30, "country_id": 83, "countryname": "Greece"},
    {"cctld": "gl", "currency": "DKK", "phonecode": 299, "country_id": 84, "countryname": "Greenland"},
    {"cctld": "gd", "currency": "XCD", "phonecode": 1473, "country_id": 85, "countryname": "Grenada"},
    {"cctld": "gp", "currency": "EUR", "phonecode": 590, "country_id": 86, "countryname": "Guadeloupe"},
    {"cctld": "gu", "currency": "USD", "phonecode": 1671, "country_id": 87, "countryname": "Guam"},
    {"cctld": "gt", "currency": "GTQ", "phonecode": 502, "country_id": 88, "countryname": "Guatemala"},
    {"cctld": "gn", "currency": "GNF", "phonecode": 224, "country_id": 89, "countryname": "Guinea"},
    {"cctld": "gw", "currency": "XOF", "phonecode": 245, "country_id": 90, "countryname": "Guinea-Bissau"},
    {"cctld": "gy", "currency": "GYD", "phonecode": 592, "country_id": 91, "countryname": "Guyana"},
    {"cctld": "ht", "currency": "USD", "phonecode": 509, "country_id": 92, "countryname": "Haiti"},
    {"cctld": "hm", "currency": "AUD", "phonecode": 0, "country_id": 93, "countryname": "Heard Island and Mcdonald Islands"},
    {"cctld": "va", "currency": "EUR", "phonecode": 39, "country_id": 94, "countryname": "Holy See (Vatican City State)"},
    {"cctld": "hn", "currency": "HNL", "phonecode": 504, "country_id": 95, "countryname": "Honduras"},
    {"cctld": "hk", "currency": "HKD", "phonecode": 852, "country_id": 96, "countryname": "Hong Kong"},
    {"cctld": "hu", "currency": "HUF", "phonecode": 36, "country_id": 97, "countryname": "Hungary"},
    {"cctld": "is", "currency": "ISK", "phonecode": 354, "country_id": 98, "countryname": "Iceland"},
    {"cctld": "in", "currency": "INR", "phonecode": 91, "country_id": 99, "countryname": "India"},
    {"cctld": "id", "currency": "IDR", "phonecode": 62, "country_id": 100, "countryname": "Indonesia"},
    {"cctld": "ir", "currency": "IRR", "phonecode": 98, "country_id": 101, "countryname": "Iran, Islamic Republic of"},
    {"cctld": "iq", "currency": "IQD", "phonecode": 964, "country_id": 102, "countryname": "Iraq"},
    {"cctld": "ie", "currency": "EUR", "phonecode": 353, "country_id": 103, "countryname": "Ireland"},
    {"cctld": "il", "currency": "ILS", "phonecode": 972, "country_id": 104, "countryname": "Israel"},
    {"cctld": "it", "currency": "EUR", "phonecode": 39, "country_id": 105, "countryname": "Italy"},
    {"cctld": "jm", "currency": "JMD", "phonecode": 1876, "country_id": 106, "countryname": "Jamaica"},
    {"cctld": "jp", "currency": "JPY", "phonecode": 81, "country_id": 107, "countryname": "Japan"},
    {"cctld": "jo", "currency": "JOD", "phonecode": 962, "country_id": 108, "countryname": "Jordan"},
    {"cctld": "kz", "currency": "KZT", "phonecode": 7, "country_id": 109, "countryname": "Kazakhstan"},
    {"cctld": "ke", "currency": "KES", "phonecode": 254, "country_id": 110, "countryname": "Kenya"},
    {"cctld": "ki", "currency": "AUD", "phonecode": 686, "country_id": 111, "countryname": "Kiribati"},
    {"cctld": "kp", "currency": "KPW", "phonecode": 850, "country_id": 112, "countryname": "Korea, Democratic People's Republic of"},
    {"cctld": "kr", "currency": "KRW", "phonecode": 82, "country_id": 113, "countryname": "Korea, Republic of"},
    {"cctld": "kw", "currency": "KWD", "phonecode": 965, "country_id": 114, "countryname": "Kuwait"},
    {"cctld": "kg", "currency": "KGS", "phonecode": 996, "country_id": 115, "countryname": "Kyrgyzstan"},
    {"cctld": "la", "currency": "LAK", "phonecode": 856, "country_id": 116, "countryname": "Lao People's Democratic Republic"},
    {"cctld": "lv", "currency": "EUR", "phonecode": 371, "country_id": 117, "countryname": "Latvia"},
    {"cctld": "lb", "currency": "LBP", "phonecode": 961, "country_id": 118, "countryname": "Lebanon"},
    {"cctld": "ls", "currency": "ZAR", "phonecode": 266, "country_id": 119, "countryname": "Lesotho"},
    {"cctld": "lr", "currency": "LRD", "phonecode": 231, "country_id": 120, "countryname": "Liberia"},
    {"cctld": "ly", "currency": "LYD", "phonecode": 218, "country_id": 121, "countryname": "Libyan Arab Jamahiriya"},
    {"cctld": "li", "currency": "CHF", "phonecode": 423, "country_id": 122, "countryname": "Liechtenstein"},
    {"cctld": "lt", "currency": "EUR", "phonecode": 370, "country_id": 123, "countryname": "Lithuania"},
    {"cctld": "lu", "currency": "EUR", "phonecode": 352, "country_id": 124, "countryname": "Luxembourg"},
    {"cctld": "mo", "currency": "MOP", "phonecode": 853, "country_id": 125, "countryname": "Macao"},
    {"cctld": "mk", "currency": "MKD", "phonecode": 389, "country_id": 126, "countryname": "Macedonia (FYROM)"},
    {"cctld": "mg", "currency": "MGA", "phonecode": 261, "country_id": 127, "countryname": "Madagascar"},
    {"cctld": "mw", "currency": "MWK", "phonecode": 265, "country_id": 128, "countryname": "Malawi"},
    {"cctld": "my", "currency": "MYR", "phonecode": 60, "country_id": 129, "countryname": "Malaysia"},
    {"cctld": "mv", "currency": "MVR", "phonecode": 960, "country_id": 130, "countryname": "Maldives"},
    {"cctld": "ml", "currency": "XOF", "phonecode": 223, "country_id": 131, "countryname": "Mali"},
    {"cctld": "mt", "currency": "EUR", "phonecode": 356, "country_id": 132, "countryname": "Malta"},
    {"cctld": "mh", "currency": "USD", "phonecode": 692, "country_id": 133, "countryname": "Marshall Islands"},
    {"cctld": "mq", "currency": "EUR", "phonecode": 596, "country_id": 134, "countryname": "Martinique"},
    {"cctld": "mr", "currency": "MRU", "phonecode": 222, "country_id": 135, "countryname": "Mauritania"},
    {"cctld": "mu", "currency": "MUR", "phonecode": 230, "country_id": 136, "countryname": "Mauritius"},
    {"cctld": "yt", "currency": "EUR", "phonecode": 269, "country_id": 137, "countryname": "Mayotte"},
    {"cctld": "mx", "currency": "MXV", "phonecode": 52, "country_id": 138, "countryname": "Mexico"},
    {"cctld": "fm", "currency": "USD", "phonecode": 691, "country_id": 139, "countryname": "Micronesia, Federated States of"},
    {"cctld": "md", "currency": "MDL", "phonecode": 373, "country_id": 140, "countryname": "Moldova"},
    {"cctld": "mc", "currency": "EUR", "phonecode": 377, "country_id": 141, "countryname": "Monaco"},
    {"cctld": "mn", "currency": "MNT", "phonecode": 976, "country_id": 142, "countryname": "Mongolia"},
    {"cctld": "ms", "currency": "XCD", "phonecode": 1664, "country_id": 143, "countryname": "Montserrat"},
    {"cctld": "ma", "currency": "MAD", "phonecode": 212, "country_id": 144, "countryname": "Morocco"},
    {"cctld": "mz", "currency": "MZN", "phonecode": 258, "country_id": 145, "countryname": "Mozambique"},
    {"cctld": "mm", "currency": "MMK", "phonecode": 95, "country_id": 146, "countryname": "Myanmar (Burma)"},
    {"cctld": "na", "currency": "ZAR", "phonecode": 264, "country_id": 147, "countryname": "Namibia"},
    {"cctld": "nr", "currency": "AUD", "phonecode": 674, "country_id": 148, "countryname": "Nauru"},
    {"cctld": "np", "currency": "NPR", "phonecode": 977, "country_id": 149, "countryname": "Nepal"},
    {"cctld": "nl", "currency": "EUR", "phonecode": 31, "country_id": 150, "countryname": "Netherlands"},
    {"cctld": "an", "currency": "NAF", "phonecode": 599, "country_id": 151, "countryname": "Netherlands Antilles"},
    {"cctld": "nc", "currency": "XPF", "phonecode": 687, "country_id": 152, "countryname": "New Caledonia"},
    {"cctld": "nz", "currency": "NZD", "phonecode": 64, "country_id": 153, "countryname": "New Zealand"},
    {"cctld": "ni", "currency": "NIO", "phonecode": 505, "country_id": 154, "countryname": "Nicaragua"},
    {"cctld": "ne", "currency": "CFA", "phonecode": 227, "country_id": 155, "countryname": "Niger"},
    {"cctld": "ng", "currency": "NGN", "phonecode": 234, "country_id": 156, "countryname": "Nigeria"},
    {"cctld": "nu", "currency": "NZD", "phonecode": 683, "country_id": 157, "countryname": "Niue"},
    {"cctld": "nf", "currency": "AUD", "phonecode": 672, "country_id": 158, "countryname": "Norfolk Island"},
    {"cctld": "mp", "currency": "USD", "phonecode": 1670, "country_id": 159, "countryname": "Northern Mariana Islands"},
    {"cctld": "no", "currency": "NOK", "phonecode": 47, "country_id": 160, "countryname": "Norway"},
    {"cctld": "om", "currency": "OMR", "phonecode": 968, "country_id": 161, "countryname": "Oman"},
    {"cctld": "pk", "currency": "PKR", "phonecode": 92, "country_id": 162, "countryname": "Pakistan"},
    {"cctld": "pw", "currency": "USD", "phonecode": 680, "country_id": 163, "countryname": "Palau"},
    {"cctld": "ps", "currency": "EGP", "phonecode": 970, "country_id": 164, "countryname": "Palestinian Territory, Occupied"},
    {"cctld": "pa", "currency": "USD", "phonecode": 507, "country_id": 165, "countryname": "Panama"},
    {"cctld": "pg", "currency": "PGK", "phonecode": 675, "country_id": 166, "countryname": "Papua New Guinea"},
    {"cctld": "py", "currency": "PYG", "phonecode": 595, "country_id": 167, "countryname": "Paraguay"},
    {"cctld": "pe", "currency": "PEN", "phonecode": 51, "country_id": 168, "countryname": "Peru"},
    {"cctld": "ph", "currency": "peso", "phonecode": 63, "country_id": 169, "countryname": "Philippines"},
    {"cctld": "pn", "currency": "NZD", "phonecode": 0, "country_id": 170, "countryname": "Pitcairn"},
    {"cctld": "pl", "currency": "PLN", "phonecode": 48, "country_id": 171, "countryname": "Poland"},
    {"cctld": "pt", "currency": "EUR", "phonecode": 351, "country_id": 172, "countryname": "Portugal"},
    {"cctld": "pr", "currency": "USD", "phonecode": 1787, "country_id": 173, "countryname": "Puerto Rico"},
    {"cctld": "qa", "currency": "QAR", "phonecode": 974, "country_id": 174, "countryname": "Qatar"},
    {"cctld": "re", "currency": "EUR", "phonecode": 262, "country_id": 175, "countryname": "Reunion"},
    {"cctld": "ro", "currency": "RON", "phonecode": 40, "country_id": 176, "countryname": "Romania"},
    {"cctld": "ru", "currency": "RUB", "phonecode": 70, "country_id": 177, "countryname": "Russian Federation"},
    {"cctld": "rw", "currency": "RWF", "phonecode": 250, "country_id": 178, "countryname": "Rwanda"},
    {"cctld": "sh", "currency": "SHP", "phonecode": 290, "country_id": 179, "countryname": "Saint Helena"},
    {"cctld": "kn", "currency": "XCD", "phonecode": 1869, "country_id": 180, "countryname": "Saint Kitts and Nevis"},
    {"cctld": "lc", "currency": "XCD", "phonecode": 1758, "country_id": 181, "countryname": "Saint Lucia"},
    {"cctld": "pm", "currency": "EUR", "phonecode": 508, "country_id": 182, "countryname": "Saint Pierre and Miquelon"},
    {"cctld": "vc", "currency": "XCD", "phonecode": 1784, "country_id": 183, "countryname": "Saint Vincent and the Grenadines"},
    {"cctld": "ws", "currency": "WST", "phonecode": 684, "country_id": 184, "countryname": "Samoa"},
    {"cctld": "sm", "currency": "EUR", "phonecode": 378, "country_id": 185, "countryname": "San Marino"},
    {"cctld": "st", "currency": "STN", "phonecode": 239, "country_id": 186, "countryname": "Sao Tome and Principe"},
    {"cctld": "sa", "currency": "SAR", "phonecode": 966, "country_id": 187, "countryname": "Saudi Arabia"},
    {"cctld": "sn", "currency": "XOF", "phonecode": 221, "country_id": 188, "countryname": "Senegal"},
    {"cctld": "rs", "currency": "EUR", "phonecode": 381, "country_id": 189, "countryname": "Serbia and Montenegro"},
    {"cctld": "sc", "currency": "SCR", "phonecode": 248, "country_id": 190, "countryname": "Seychelles"},
    {"cctld": "sl", "currency": "SLL", "phonecode": 232, "country_id": 191, "countryname": "Sierra Leone"},
    {"cctld": "sg", "currency": "SGD", "phonecode": 65, "country_id": 192, "countryname": "Singapore"},
    {"cctld": "sk", "currency": "EUR", "phonecode": 421, "country_id": 193, "countryname": "Slovakia"},
    {"cctld": "si", "currency": "EUR", "phonecode": 386, "country_id": 194, "countryname": "Slovenia"},
    {"cctld": "sb", "currency": "SBD", "phonecode": 677, "country_id": 195, "countryname": "Solomon Islands"},
    {"cctld": "so", "currency": "SOS", "phonecode": 252, "country_id": 196, "countryname": "Somalia"},
    {"cctld": "za", "currency": "ZAR", "phonecode": 27, "country_id": 197, "countryname": "South Africa"},
    {"cctld": "gs", "currency": "", "phonecode": 0, "country_id": 198, "countryname": "South Georgia and the South Sandwich Islands"},
    {"cctld": "es", "currency": "EUR", "phonecode": 34, "country_id": 199, "countryname": "Spain"},
    {"cctld": "lk", "currency": "LKR", "phonecode": 94, "country_id": 200, "countryname": "Sri Lanka"},
    {"cctld": "sd", "currency": "SDG", "phonecode": 249, "country_id": 201, "countryname": "Sudan"},
    {"cctld": "sr", "currency": "SRD", "phonecode": 597, "country_id": 202, "countryname": "Suriname"},
    {"cctld": "sj", "currency": "NOK", "phonecode": 47, "country_id": 203, "countryname": "Svalbard and Jan Mayen"},
    {"cctld": "sz", "currency": "SZL", "phonecode": 268, "country_id": 204, "countryname": "Swaziland"},
    {"cctld": "se", "currency": "SEK", "phonecode": 46, "country_id": 205, "countryname": "Sweden"},
    {"cctld": "ch", "currency": "CHW", "phonecode": 41, "country_id": 206, "countryname": "Switzerland"},
    {"cctld": "sy", "currency": "SYP", "phonecode": 963, "country_id": 207, "countryname": "Syrian Arab Republic"},
    {"cctld": "tw", "currency": "NT$", "phonecode": 886, "country_id": 208, "countryname": "Taiwan, Province of China"},
    {"cctld": "tj", "currency": "TJS", "phonecode": 992, "country_id": 209, "countryname": "Tajikistan"},
    {"cctld": "tz", "currency": "TZS", "phonecode": 255, "country_id": 210, "countryname": "Tanzania, United Republic of"},
    {"cctld": "th", "currency": "THB", "phonecode": 66, "country_id": 211, "countryname": "Thailand"},
    {"cctld": "tl", "currency": "USD", "phonecode": 670, "country_id": 212, "countryname": "Timor-Leste"},
    {"cctld": "tg", "currency": "XOF", "phonecode": 228, "country_id": 213, "countryname": "Togo"},
    {"cctld": "tk", "currency": "NZD", "phonecode": 690, "country_id": 214, "countryname": "Tokelau"},
    {"cctld": "to", "currency": "TOP", "phonecode": 676, "country_id": 215, "countryname": "Tonga"},
    {"cctld": "tt", "currency": "TTD", "phonecode": 1868, "country_id": 216, "countryname": "Trinidad and Tobago"},
    {"cctld": "tn", "currency": "TND", "phonecode": 216, "country_id": 217, "countryname": "Tunisia"},
    {"cctld": "tr", "currency": "TRY", "phonecode": 90, "country_id": 218, "countryname": "Turkey"},
    {"cctld": "tm", "currency": "TMT", "phonecode": 7370, "country_id": 219, "countryname": "Turkmenistan"},
    {"cctld": "tc", "currency": "USD", "phonecode": 1649, "country_id": 220, "countryname": "Turks and Caicos Islands"},
    {"cctld": "tv", "currency": "AUD", "phonecode": 688, "country_id": 221, "countryname": "Tuvalu"},
    {"cctld": "ug", "currency": "UGX", "phonecode": 256, "country_id": 222, "countryname": "Uganda"},
    {"cctld": "ua", "currency": "UAH", "phonecode": 380, "country_id": 223, "countryname": "Ukraine"},
    {"cctld": "ae", "currency": "AED", "phonecode": 971, "country_id": 224, "countryname": "United Arab Emirates"},
    {"cctld": "uk", "currency": "GBP", "phonecode": 44, "country_id": 225, "countryname": "United Kingdom"},
    {"cctld": "us", "currency": "USD", "phonecode": 1, "country_id": 226, "countryname": "United States"},
    {"cctld": "um", "currency": "USD", "phonecode": 1, "country_id": 227, "countryname": "United States Minor Outlying Islands"},
    {"cctld": "uy", "currency": "UYU", "phonecode": 598, "country_id": 228, "countryname": "Uruguay"},
    {"cctld": "uz", "currency": "UZS", "phonecode": 998, "country_id": 229, "countryname": "Uzbekistan"},
    {"cctld": "vu", "currency": "VUV", "phonecode": 678, "country_id": 230, "countryname": "Vanuatu"},
    {"cctld": "ve", "currency": "VEF", "phonecode": 58, "country_id": 231, "countryname": "Venezuela"},
    {"cctld": "vn", "currency": "VND", "phonecode": 84, "country_id": 232, "countryname": "Vietnam"},
    {"cctld": "vg", "currency": "USD", "phonecode": 1284, "country_id": 233, "countryname": "Virgin Islands, British"},
    {"cctld": "vi", "currency": "USD", "phonecode": 1340, "country_id": 234, "countryname": "Virgin Islands, U.s."},
    {"cctld": "wf", "currency": "XPF", "phonecode": 681, "country_id": 235, "countryname": "Wallis and Futuna"},
    {"cctld": "eh", "currency": "MAD", "phonecode": 212, "country_id": 236, "countryname": "Western Sahara"},
    {"cctld": "ye", "currency": "YER", "phonecode": 967, "country_id": 237, "countryname": "Yemen"},
    {"cctld": "zm", "currency": "ZMW", "phonecode": 260, "country_id": 238, "countryname": "Zambia"},
    {"cctld": "zw", "currency": "ZWL", "phonecode": 263, "country_id": 239, "countryname": "Zimbabwe"}
    ]
  filteredOptions: Observable<cc[]>;

  selected: {start: Moment, end: Moment};

  selectedItem = 'sale';
  users: object;
  user$: object;
  pageNo  = 1;
  isLoading = true;
  searchString:string;
  countrySelected = 'in';
  selectedCountry = 'India';
  countryList: object;
  myFiles:string [] = [];
  sMsg:string = '';
  totCount: object;
  public totalCount = 0;
  dateSelected = '';
  showTable: boolean = true;

	dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['select', 'property_details_id', 'property_unique_id', 'posted_by', 'posted_date','property_name','contact_name','contact_number','location','contact_email','city','service_name'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute, private dataService: DataService, public dialog: MatDialog, private httpService: HttpClient, private datePipe: DatePipe) {
    this.route.params.subscribe( params => this.user$ = params.id );
  }

  ngOnInit() {

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string | cc>(''),
        map(value => typeof value === 'string' ? value : value.countryname),
        map(countryname => countryname ? this._filter(countryname) : this.options.slice())
      );

    this.dataService.getService(this.countrySelected, 'sale', this.pageNo, '').subscribe(result => {
      result = this.totCount = result;
      let lastIndex = result.length - 1;
      this.totalCount = this.totCount[lastIndex].totlprop;
      this.isLoading = false;
      result.pop();
      this.dataSource= new MatTableDataSource(result);
      this.dataSource.sort= this.sort;
      this.dataSource.paginator=this.paginator;
    })

  }

  displayFn(cc?: cc): string | undefined {
    return cc ? cc.countryname : undefined;
  }

  private _filter(name: string): cc[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.countryname.toLowerCase().indexOf(filterValue) === 0);
  }

  showNoData(){
    if(this.totalCount<=0  && this.isLoading == false)
        return true;
    else
        return false;
  }

  showNoData2(){
    if(this.totalCount>0  && this.isLoading == false)
      return true;
    else
      return false;
  }

  refreshData(){
    this.showTable = false;
    this.isLoading = true;
    this.searchString = '';
    this.dateSelected = '';
    this.pageNo = 1;

    this.dataService.getService(this.countrySelected, 'sale', this.pageNo).subscribe(result => {
      result = this.totCount = result;
      let lastIndex = result.length - 1;
      this.totalCount = this.totCount[lastIndex].totlprop;
      this.isLoading = false;
      result.pop();
      this.dataSource= new MatTableDataSource(result);
      this.dataSource.sort= this.sort;
      this.dataSource.paginator=this.paginator;
    });
    
    setTimeout(()=>{this.showTable = true; this.isLoading = false;}, 0);
  }

  getFileDetails (e) {
    for (var i = 0; i < e.target.files.length; i++) { 
      this.myFiles.push(e.target.files[i]);
    }
  }

  uploadFiles () {
    const frmData = new FormData();
    
    for (var i = 0; i < this.myFiles.length; i++) { 
      frmData.append("filename", this.myFiles[i]);
    }
  
    this.httpService.post('https://www.realtymonk.com/websapi/freelisting/import', frmData).subscribe(
      data => {
        this.sMsg = data as string;
      }
    );
  }

  userNext(sid:string){
    this.isLoading = true;
    this.selectedItem = sid;
    this.pageNo = 1;

    if(this.dateSelected !=undefined && this.dateSelected !=''){
      this.dateSelected =  this.dateSelected;
    }
    else{
      this.dateSelected ='';
    }

    this.dataService.getService(this.countrySelected, sid, this.pageNo, this.searchString, this.dateSelected).subscribe(result => {
      if(result.length > 1){
        this.isLoading = false;
        let lastIndex = result.length - 1;
        this.totalCount = this.totCount[lastIndex].totlprop;
        result.pop();
        this.dataSource= new MatTableDataSource(result);
        this.dataSource.sort= this.sort;
        this.dataSource.paginator=this.paginator;
      }else{
        this.totalCount=0;
        this.isLoading = false;
      }
    })
  }

  applyFilter(filterValue) {

    this.pageNo = 1;

    if(this.dateSelected !=undefined && this.dateSelected !=''){
      this.dateSelected =  this.dateSelected;
    }
    else{
      this.dateSelected ='';
    }

    this.dataService.getService(this.countrySelected, this.selectedItem, this.pageNo, filterValue, this.dateSelected).subscribe(result => {
      if(result.length > 1){ 
        result = this.totCount = result;
        let lastIndex = result.length - 1;
        this.totalCount = this.totCount[lastIndex].totlprop;
        result.pop();
        this.dataSource= new MatTableDataSource(result);
        this.dataSource.sort= this.sort;
        this.dataSource.paginator=this.paginator;
      }
      else{
        this.totalCount=0;
        result.pop();
        this.dataSource= new MatTableDataSource(result);
        this.dataSource.sort= this.sort;
        this.dataSource.paginator=this.paginator;
      }
    })

  }

  applyDate(startdate) {

    this.pageNo = 1;
        
    if(startdate.start!=undefined){  
      this.dateSelected = this.datePipe.transform(startdate.start, 'yyyy-MM-dd') + '-to-' + this.datePipe.transform(startdate.end, 'yyyy-MM-dd');
    } else{
      this.dateSelected = ''; 
    }

    if(this.searchString!=undefined && this.searchString !=''){
      this.searchString=this.searchString;
    } else{
      this.searchString='';
    }

    this.dataService.getService(this.countrySelected, this.selectedItem, this.pageNo, this.searchString,this.dateSelected).subscribe(result => {
      if(result.length > 1){ 
        result = this.totCount = result;
        let lastIndex = result.length - 1;
        this.totalCount = this.totCount[lastIndex].totlprop;    
        result.pop();
        this.dataSource= new MatTableDataSource(result);
        this.dataSource.sort= this.sort;
        this.dataSource.paginator=this.paginator;
      }
      else{
        this.totalCount=0;
        result.pop();
        this.dataSource= new MatTableDataSource(result);
        this.dataSource.sort= this.sort;
        this.dataSource.paginator=this.paginator;
      }
    })
  }

  changeCountry(countryCode) {
    this.pageNo = 1;
    this.searchString = '';
    this.countrySelected = countryCode;

    this.dataService.getService(this.countrySelected, this.selectedItem, this.pageNo, '', this.dateSelected).subscribe(result => {
      if(result.length > 1){ 
        result = this.totCount = result;
        let lastIndex = result.length - 1;
        this.totalCount = this.totCount[lastIndex].totlprop;
        result.pop();
        this.dataSource= new MatTableDataSource(result);
        this.dataSource.sort= this.sort;
        this.dataSource.paginator=this.paginator;
      }
      else{
        this.totalCount=0;
        result.pop();
        this.dataSource= new MatTableDataSource(result);
        this.dataSource.sort= this.sort;
        this.dataSource.paginator=this.paginator;
      }
    })
  }

  onKeydown(evt,cctld){
    if (evt.source.selected) {
      this.changeCountry(cctld);
    }
  }

  pageNext(filtervalue){
    this.pageNo = this.pageNo + 1;
    this.dataService.getService(this.countrySelected, this.selectedItem, this.pageNo, filtervalue).subscribe(result => {
      if(result.length > 1){
        result = this.totCount = result;
        let lastIndex = result.length - 1;
        this.totalCount = this.totCount[lastIndex].totlprop; 
        result.pop();
        this.dataSource= new MatTableDataSource(result);
        this.dataSource.sort= this.sort;
        this.dataSource.paginator=this.paginator;
      } else{
        (<HTMLInputElement>document.getElementById("next_response")).disabled=true; 
          this.pageNo = this.pageNo - 1;
      }
    })
  }

  pagePrevious(filtervalue){
    if(this.pageNo>1){
      this.pageNo = this.pageNo - 1;
      this.dataService.getService(this.countrySelected, this.selectedItem, this.pageNo, filtervalue).subscribe(result => {
        result = this.totCount = result;
        this.isLoading = false;
        result.pop();
        this.dataSource= new MatTableDataSource(result);
        this.dataSource.sort= this.sort;
        this.dataSource.paginator=this.paginator;
      })
    }
    (<HTMLInputElement>document.getElementById("next_response")).disabled=false;
  }

  openModal(){
    this.dialog.open(PopupComponent);
  }

  openEditPopup(){
    this.dialog.open(EditComponent,  { disableClose: true });
  }

}

export interface User{}