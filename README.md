# Old Guy Programmer Contact Us Server

Written using Node/Express. Running as an API server for the Old Guy Programmer company. Intended as the server for Contact Us requests. When a request is accepted, an email will be sent to Old Guy Programmer support; to the email of the person requesting information; and a record recording the contact is saved on the Firebase database.

Database: Firebase/Firestore

OGP Email address: info@oldguyprogrammer.com

Routes:
/shutdown: exit the program
/savecontact: triggered by the request for information.
/ping: will trigger a simple response, used to see if the app is operating.
/\*: Default route will send an error response, REST 404.

Security:
This app uses Heroku's native HTPPS protocol.

There is DDOS protection limiting 100 requests per hour from the same URL.

CORS protection.
