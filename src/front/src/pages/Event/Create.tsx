import React, { FunctionComponent, useState } from 'react';
import  Editor  from '../../components/Event/Editor';
import { Col, Button, Form, FormGroup, Label, Input, Container, Row } from 'reactstrap';
import { Controller, useForm } from "react-hook-form";
import Select from '../../components/Select';
import useOptions from '../../components/Options';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { DevTool } from "@hookform/devtools";
import AjaxHelper from '../../helpers/AjaxHelper';

/*
type CreatorParams = {
  cityId: any,
  levelId: any,
  sportId: any,
  appointment: any,
  time: any,
  phoneNumber: string,
  //showTelephone: any,
  description: string,
  newDate: any
}
*/
const Create: FunctionComponent<{}> = () => {
  return (
      <Editor/>
  );
}

export default Create;