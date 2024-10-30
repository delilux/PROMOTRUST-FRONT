import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { 
  FormBuilder, 
  FormGroup,
   ReactiveFormsModule, 
  Validators,
  FormControl,
 } from '@angular/forms';
import { PreguntasService } from '../../../services/preguntas.service';
import { Preguntas } from '../../../models/preguntas';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';


