# 🐳 DockerHub Mass Archive Tool

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Playwright](https://img.shields.io/badge/Playwright-1.52.0-blue)](https://playwright.dev)

A powerful automation tool built with Playwright to bulk archive multiple Docker Hub repositories. Perfect for cleaning up old repositories or managing large Docker Hub organizations.

## ✨ Features

- 🔐 Secure login handling with TOTP-based 2FA support
- 📦 Bulk archive multiple repositories in one go
- 🔄 Configurable repository list via JSON
- 📊 Detailed progress tracking and logging
- 🛡️ Robust error handling with failure recovery
- 📸 Automatic screenshots on failure
- 🚀 Fast and reliable automation

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Docker Hub account with repository access

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/dockerhub-mass-archive.git
cd dockerhub-mass-archive
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npm run install:browsers
```

### Configuration

1. Create a `docker_repositories.json` file in the root directory:
```json
{
  "repositories": [
    "https://hub.docker.com/r/username/repo1",
    "https://hub.docker.com/r/username/repo2"
  ]
}
```

2. Set up your Docker Hub credentials using the .env file:
```bash
# Copy the template file
cp env.template .env

# Edit the .env file with your credentials
nano .env  # or use your preferred text editor
```

3. If you have 2FA enabled on your Docker Hub account:
   - You'll need to set up the TOTP secret key for automated authentication
   - See [2FA Authentication Guide](./README_2FA.md) for detailed instructions on obtaining your TOTP secret

   > Note: All credentials are automatically loaded from the .env file using the dotenv package.

## 🎯 Usage

### Basic Usage

Run the automation:
```bash
npm run test:automation
```

### Advanced Usage

- Run with browser UI visible:
```bash
npm run test:automation:ui
```

- Run in debug mode:
```bash
npm run test:automation:debug
```

- View test reports:
```bash
npm run test:automation:report
```

## 📝 Output

The tool provides detailed console output:
- ✅ Progress updates for each repository
- 🎉 Success messages for archived repositories
- ❌ Error messages for failed operations
- 📊 Summary of operations

## 🛡️ Error Handling

- 🔄 Continues processing remaining repositories if one fails
- 📝 Detailed error messages in console
- 📸 Screenshots captured on failure
- 🔍 Detailed test reports for debugging

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⭐ Show your support 
