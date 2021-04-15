<h1>The Party Central App<h1>
The Party Central App is designed to display the dishes and rsvp list for dinner parties. None of us want to up to a party with wrong thing. **Party Central displays who's bringing what where.** 

<h2>Server Details<h2>
1.The major of the app is displayed in tables. These tables reflect the three tables that make up our local database.
2. This app pulls data from a local API.
2. When managing application you must be able to create edit and delete. So the user,events and Rsvp controllers hold the logic for our CRUD on the frontend. 
4. The index model has specific associations so that the each request of the user pulls the proper data. ***For example user clicking on an event, will rsvp them for the correct event, but also store that rsvp for the host of the party.***