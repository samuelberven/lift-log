# Todo

## Deployment
- Postgres DB on AWS RDS
- Rails container on Google Cloud Run
- Static frontend on AWS S3/CloudFront 

# Integration with Cloudflare site:
- Create CNAME records pointing to:
  - api.lift-log.myname.com (points toECS/Fargate ALB)
  - lift-log.myname.com (points to CloudFront distribution)


# TODO:
- Update users-have-exercise description to have a "Notes" section if one doesn't exist
- Automatically link users to a Google search of what an exercise looks like (maybe the video shorts?)
- Update metadata
- Add Postman API testing file (base on MTX_insights)
- Attractive README.md (here and on GitHub main page as well as portfolio)
- Deploy on AWS w/ Postgres (eventually move to Lambda and static instance-- but only do this after Microtransaction Insights is fully deployed on the cloud && there's an EC2 or equivalent instance for another app out)
- Add a way to show statistics of everyone's data (while maintaining their security-- figure out a way to sanitize it)
- use some javascript framework to show graphs, etc.
- Add a logger that logs all issues and crashes (encourage people to try and break it-- by adding a negative value to a weight, puttting a written-out number when it should be just numerals, etc. The logger would servce as a record of that so I know what to debug)

# To think about:
- Change name to LiftLog?
- Conditional rendering for header

