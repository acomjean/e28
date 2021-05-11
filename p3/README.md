# Project 2

-   Aram Comjean
-   Production URL: <http://e28p2.aramcomjean.com>

## Pages summary

- Home page (Instructions)
- Artists Browser
- Itinerary Manager

## SFC summary

-ArtistListPage.vue
-HomePage.vue
-ItineraryPage.vue

-ArtistGrid.vue
-ArtistSlideshow.vue


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

https://stackoverflow.com/questions/40491506/vue-js-dynamic-images-not-working

https://www.telerik.com/blogs/how-to-emit-data-in-vue-beyond-the-vuejs-documentation

https://stackoverflow.com/questions/5915096/get-a-random-item-from-a-javascript-array
https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array


p3
https://stackoverflow.com/questions/45848974/call-an-action-from-within-another-action



## Notes for instructor

* Based on the Somerville Open Studios Artists Browser: Designed and built by me ontop 
of an old database (mysql). 
Performance is ok, but not a SPA (not Javascript based). (Symfony/ bootstrap3)
[artist browser](https://www.somervilleopenstudios.org/web/artists/artist_directory_list/display=grid/medium=All/event=All/map_num=All/display_order=random)
* One thing that caught me was props are immutable inside a component.  So even though my ArtistSlideshow.vue had new data for each new artist coming in. If someone left the image at slide 7, and the next artist only had 3 images, it would crash.  I couldn't find a Vue lifecycle event to stop, this (even passing in a 0 to start the slideshow at 0 didnt' work)
* messages and error reporting are in skeletol form from zip foods example.  
* A lot of common code got pushed up to the App.vue.  
* There is almost no stlying except for my bad buttons and flex-box/css grid for basic page layout
* I took the Nav css from zipfoods. 