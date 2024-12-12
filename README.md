simple tickit reservation 
depand on the unique id of the user and the date that he make the reservation he get an qe code dwonloaded to his device 
and this qrcode generated using qrcode liprary 

and then the employees have acess to a scanner page that will scan this qr code and validate the existanse of the ticket 

validation and scanner with html5qrcode liprary

and using express to handle end points and serve static files 
and simple mysql database consist of 2 tables one for tickit and one for employees


navigate to http://localhost:3000/wel to reserve tickit and get qrcode 

navigate to http://localhost:3000/validate if you are employee to go to ecanner 
