A 4 day project to create a fullstack app.

Brief: create an app for golfers to input, track and compare their rounds with friends and update their handicap index.
Users: hobby golfers
Main Goals: - Players (my mates) often prefer writing their scores on a scorecard vs using an app. I wanted to make it easy for them to transfer this data after their round via an input that only required them to count up the number of birdies, pars, bogies, etc for their round.
            - Their leaderboard score is made up of their top 3 stableford rounds with an 18-handicap. This system was used to immitate a stroke play kind of format whilst removing the need to record a score on every hole.

The app is live but in a "testing" phase so please feel free to signup and input some fake rounds

https://royal-badger-and-pit.vercel.app/

# Current funcitonality:
  Users can:  - signup and create a unique username
              - input a new score 
              - view the leaderboard of ALL users (a user's score is their top 3 scores with an 18-handicap)
              - calculates the user's handicap index
              - user can view stats from their previous rounds
              
# In development:
              - improve player's profile UI to include player activity and stats sections
              - users will be able to create their own leagues for friends and family
              - improved UI
              - update type interfaces (current version is lazy TS)
