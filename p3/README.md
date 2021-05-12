# Project 3

-   Aram Comjean
-   Production URL: <http://e28p3.aramcomjean.com>

## Pages summary

- Home page (Instructions)
- Artists Browser
- Itinerary Manager
- Login
- New Account

## SFC summary

-ArtistListPage.vue
-HomePage.vue
-ItineraryPage.vue

-LoginPage.vue
-LoginNewPage.vue
-LogoutPage.vue

-ArtistGrid.vue
-ArtistSlideshow.vue
-ErrorField.vue

## Server interaction

Itinerary
- member_id (artists)
- user_id (user)
- rating
- comments

## Outside resources

Artist Data: 

https://www.somervilleopenstudios.org/web/data/get_all_members/

Open Studios need to clean up our db structure.

Images loaded from somervilleopenstudio.org host.

Login Code Based on e28 zip foods example, with some code brought over verbatim


p3
https://stackoverflow.com/questions/45848974/call-an-action-from-within-another-action
https://docs.cypress.io/guides/getting-started/testing-your-app#Logging-in
https://docs.cypress.io/guides/core-concepts/variables-and-aliases#Variables

## Notes for instructor

* Based on the Somerville Open Studios Artists Browser: Designed and built by me ontop 
of an old database (mysql). 
* Testing this was difficult due to a lot of functionality behind
login.   I reference a guide I found on this in Outside resources.  
* Need to reset state for better testing
* Need more tests.
* Left in default users/ tables.  I only have one api on my url.
* Used a bit of the login, create user code from zipfoods.
* removed props except for the page building components (ArtistsGrid.vue/ArtistSlideshow.vue)

## How is authentication being used in your application?
* User can't get to itinerary page without login
* The browse Artist Page removes the ability to modify the itinerary as well
* Browse artists page invites users to login
* Javascript error checking on create new user page. with server side as backup/ user creation confirmation.

## What data entities of your application are being managed via Vuex?
* Most of them 
* Logged In user Information
* Artists Data (static)
* Itinerary Data (Updateable and stored on e28api server)


