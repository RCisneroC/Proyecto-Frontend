import { Component, OnInit } from '@angular/core';


import { Chart,ChartType } from 'chart.js/auto';
import { TeacherService } from '../services/teacher.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-teacher-detail-evolution',
  templateUrl: './teacher-detail-evolution.component.html',
  styleUrls: ['./teacher-detail-evolution.component.scss']
})
export class TeacherDetailEvolutionComponent  implements OnInit{
  Datagrafica: any;
  cedula: any;
  isTblLoading: boolean=true;

   constructor(public _teacherService:TeacherService,
    private activatedRoute: ActivatedRoute,
    private _nav: Router
   ) {

   }
  public chart!: Chart ;
  Regresar(){
    this._nav.navigate(['/teaching-management/teacher-list/']);
  }
 getdatosgrafica(){
  //_teacherService.getDatGrafica("111-22-33").subscribe 
  
  this._teacherService.getDataGrafica(this.cedula).subscribe({
    next: (res:any) => {

      this.Datagrafica = res;
   
      
      const data2 = {
        labels: res.year,
        datasets: [
          {
            label: 'Puntos x Documentos',
            data: res.xDocument,
            backgroundColor: 'rgb(241, 148, 138)',
          },
          {
            label: ' Puntos x Actividad',
            data: res.xActivity,
            backgroundColor: 'rgb(187, 143, 206)',
          },
          {
            label: ' Puntos x Asignatura',
            data: res.xSubject,
            backgroundColor: 'rgb(220, 118, 51)',
          },
          {
            label: ' Puntos x Nivel Educativo',
            data: res.xNivelEducativo,
            backgroundColor: 'rgb( 249, 231, 159  )',
          },
          // {
          //   label: ' Puntos x Evaluación',
          //   data: res.xEvaluation,
          //   backgroundColor: 'rgb(204, 209, 209 )',
          // },
          {
            label: ' Puntos x Experiencia',
            data:res.xExperience,
            backgroundColor: 'rgb(171, 235, 198 )',
          },
        ]
      };
      
      this.chart = new Chart("mychart", {
        type: 'bar' as ChartType, // tipo de la gráfica 
        data: data2, // datos ,
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Evolución del docente'
            },
          },
      
          responsive: true,
          scales: {
            x: {
              stacked: true,
            },
            y: {
            //   ticks: {
            //     callback: function(value, index, values) {
            //         // Si es la última etiqueta, mostrar el total
            //         if (index === values.length - 1) {
            //             return 143;
            //         } else {
            //             // Mostrar el valor normal
            //             return value;
            //         }
            //     }
            // },
            ticks: {
             // stepSize: 6, // Ajusta el tamaño del paso según tus necesidades
           
             // autoSkip: true,
             // maxTicksLimit: 10
            },
              beginAtZero:true,
              stacked: true
            }
          }
        }
      });
      this.isTblLoading=false;
    }
  })
 }
 
  ngOnInit(): void {
  this.isTblLoading=true;
  this.cedula = this.activatedRoute.snapshot.params["cedula"];
  this.getdatosgrafica();
  
    // datos
    // const data = {
    //   labels: ['January'],
    //   datasets: [{
    //     label: 'My First Dataset',
    //     data: [65],
    //     fill: true,
    //     borderColor: 'rgb(75, 192, 192)',
    //     tension: 0.1
    //   },{
    //     label: 'My second Dataset',
    //     data: [15, 39, 20, 31, 16, 25, 20],
    //     fill: true,
    //     borderColor: 'rgb(75, 195, 195)',
    //     tension: 0.1
    //   }]
    // };




    // Creamos la gráfica
   // const total = data2.reduce((acc, curr) => acc + curr, 0);

  }
}
