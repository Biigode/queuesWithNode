import nodemailer from "nodemailer";
import { PortPedidoDb } from "../../ports/pedidoDb.ts";
import { PortMail } from "../ports/mail.ts";

export class AdapterMail extends PortMail {
  constructor(private portPedidoDB: PortPedidoDb) {
    super(portPedidoDB);
  }
  async enviarEmail(id: string): Promise<void> {
    const pedido = await this.portPedidoDB.buscarPorId(id);
    
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_KEY,
      },
    });

    let mailOptions = {
      from: "process.env.EMAIL",
      to: "victor.freitas08@gmail.com",
      subject: "Seu pedido está pronto!",
      text: "O seu pedido está pronto para ser retirado!",
    };

    transporter.sendMail(mailOptions, function (error: any, info: any) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email enviado: " + info.response);
      }
    });
  }
}
