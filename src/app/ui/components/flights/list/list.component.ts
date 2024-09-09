import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FlightsService } from '../../../../services/common/models/flights.service';
import { List_Flight } from '../../../../contracts/list_flight';
import { ActivatedRoute } from '@angular/router';
import { Create_Reservation } from '../../../../contracts/reservation/create_reservation';
import { ReservationService } from '../../../../services/common/models/reservation.service';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../../../services/ui/custom-toastr.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReservationsComponent } from '../../reservations/reservations.component';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { List_Flight_V2 } from '../../../../contracts/list_flight_v2';
declare var bootstrap: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [DatePipe]
})
export class ListComponent extends BaseComponent implements OnInit {
  @ViewChild('yourSelectorName') modalRef = {} as ElementRef;
  cities: string[] = [
    'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Aksaray', 'Amasya',
    'Ankara', 'Antalya', 'Artvin', 'Aydın', 'Balıkesir', 'Bartın',
    'Batman', 'Bayburt', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu',
    'Burdur', 'Bursa', 'Çanakkale', 'Çankırı', 'Çorum', 'Denizli',
    'Diyarbakır', 'Düzce', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum',
    'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay',
    'Iğdır', 'Isparta', 'İstanbul', 'İzmir', 'Kahramanmaraş', 'Karabük',
    'Karaman', 'Kars', 'Kastamonu', 'Kayseri', 'Kırıkkale', 'Kırklareli',
    'Kırşehir', 'Kilis', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya',
    'Manisa', 'Mardin', 'Mersin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde',
    'Ordu', 'Osmaniye', 'Rize', 'Sakarya', 'Samsun', 'Sanlıurfa',
    'Siirt', 'Sinop', 'Sivas', 'Şanlıurfa', 'Şırnak', 'Tekirdağ',
    'Tokat', 'Trabzon', 'Tunceli', 'Uşak', 'Van', 'Yalova', 'Yozgat',
    'Zonguldak'
  ];
  constructor(
    private flightService: FlightsService,
    private activatedRoute: ActivatedRoute,
    private reservationService: ReservationService,
    spinner: NgxSpinnerService,
    private toastrService: CustomToastrService,
    private zone: NgZone,
    private modalService: NgbModal,
    private dialog : MatDialog,
    private datePipe: DatePipe
  ) {
    super(spinner);
  }

  flights: List_Flight[];
  flightsAll : List_Flight_V2[]
  formattedDateTime: string;
  currentPageNo: number;
  totalFlightCount: number;
  totalPageCount: number;
  pageSize: number = 12;
  pageList: number[] = [];
  selectedFlight: any;
  filters = {
    departure: '',
    destination: '',
    date: '',
  };
  filteredFlights = [];

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      this.currentPageNo = parseInt(params['pageNo'] ?? 1);
  
      // Tüm uçuşları alıyoruz ve flightsAll dizisine atıyoruz
      const allFlightsData = await this.flightService.readAll(
        () => {},
        (errorMessage) => {}
      );
      this.flightsAll = allFlightsData.flightsAll;
  
      // Sayfalı uçuşları almak için read metodunu kullanıyoruz
      const data: { totalFlightCount: number; flights: List_Flight[] } =
        await this.flightService.read(
          this.currentPageNo - 1,
          this.pageSize,
          () => {},
          (errorMessage) => {}
        );
  
      this.flights = data.flights;
      this.totalFlightCount = data.totalFlightCount;
      this.totalPageCount = Math.ceil(this.totalFlightCount / this.pageSize);
      this.pageList = [];
  
      if (this.currentPageNo - 3 <= 0) {
        for (let i = 1; i <= 7; i++) this.pageList.push(i);
      } else if (this.currentPageNo + 3 >= this.totalPageCount) {
        for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++)
          this.pageList.push(i);
      } else {
        for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++)
          this.pageList.push(i);
      }
  
      this.filterFlights(); // Uçuşlar yüklendikten sonra filtreleme işlemi yapılıyor.
    });
  }

  filterFlights() {
    this.showSpinner(SpinnerType.SquareJellyBox);
  
    // flightsAll üzerinde filtreleme yapıyoruz
    const filtered = this.flightsAll.filter((flight) => {
      const departureMatch =
        !this.filters.departure ||
        flight.departure
          .toLowerCase()
          .includes(this.filters.departure.toLowerCase());
      const destinationMatch =
        !this.filters.destination ||
        flight.destination
          .toLowerCase()
          .includes(this.filters.destination.toLowerCase());
  
      const dateMatch =
        !this.filters.date ||
        new Date(flight.date).toLocaleDateString() ===
          new Date(this.filters.date).toLocaleDateString();
      return departureMatch && destinationMatch && dateMatch;
    });
  
    // Sayfalama işlemi için slice kullanarak sadece istenilen sayfayı alıyoruz
    const startIndex = (this.currentPageNo - 1) * this.pageSize;
    const endIndex = this.currentPageNo * this.pageSize;
    this.filteredFlights = filtered.slice(startIndex, endIndex);
  
    this.hideSpinner(SpinnerType.SquareJellyBox);
  }

  async addToReservation(flight: List_Flight) {
    this.showSpinner(SpinnerType.SquareJellyBox);
    let _reservation: Create_Reservation = new Create_Reservation();
    _reservation.flightId = flight.id;
    _reservation.quantity = 1;
    await this.reservationService.add(_reservation);
    this.hideSpinner(SpinnerType.SquareJellyBox);
    this.toastrService.message(
      'Rezervasyon Yapılmıştır.',
      'Bilet Alımı Başarılı',
      {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight,
      }
    );
  }

  openModal(flight: List_Flight) {
    const modalRef = this.modalService.open(ReservationsComponent, {
      size: 'xl', // Modal genişliğini büyük yapmak için
      centered: true, // Modalı ortalamak için
      windowClass: 'extra-large-modal' // CSS sınıfını tanımlamak için
    });
    modalRef.componentInstance.flight = flight;
   
  }

  toggleCollapse(id: string) {
    this.zone.run(() => {
      const element = document.getElementById(id);
      if (element) {
        const bsCollapse = new bootstrap.Collapse(element, {
          toggle: true,
        });
        bsCollapse.toggle();
      }
    });
  }
}
