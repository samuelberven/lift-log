# Todo

## Deployment
- Postgres DB on AWS RDS
- Rails container on Google Cloud Run
- Static frontend on AWS S3/CloudFront 

# Integration with Cloudflare site:
- Create CNAME records pointing to:
  - api.lift-log.myname.com (points toECS/Fargate ALB)
  - lift-log.myname.com (points to CloudFront distribution)

