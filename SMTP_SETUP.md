# SMTP Configuration

To enable the contact form email functionality, create a `.env` file in the project root with the following variables:

```env
# SMTP Server Configuration
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-smtp-password

# Email Configuration
SMTP_FROM=your-email@example.com
CONTACT_EMAIL=your-email@example.com
```

## Notes:
- `SMTP_PORT`: Usually 587 for TLS or 465 for SSL
- `SMTP_FROM`: The "from" address in sent emails (defaults to SMTP_USER if not set)
- `CONTACT_EMAIL`: Where contact form submissions will be sent (defaults to SMTP_USER if not set)

## Common SMTP Providers:

### Gmail
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

### Outlook/Office 365
```
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASSWORD=your-password
```

### SendGrid
```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
```

Make sure to add `.env` to your `.gitignore` file to keep your credentials secure!

