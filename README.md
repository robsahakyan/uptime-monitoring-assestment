# 🚀 Website Monitoring Coding Assestment

This is an example Node.js application that demonstrates basic usage of Node.js and npm.

## Installation

If Node.js is not already installed on your system, you can download and install it from the [official website](https://nodejs.org/).

To run this application locally, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/robsahakyan/uptime-monitoring-assestment

2. Navigate to the project directory:

    cd uptime-monitoring-assestment

3. Install the dependencies:

    npm install

📋 Usage

After installing the dependencies, you can start the application using the following command:

npm run start

This will start the application and begin monitoring the websites specified in the config.json file.

⚙️ Configuration

The application uses a config.json file to specify configurations about website URLs, threshold, and interval.

Here's an example of the config.json file:

{
    "urls": [
        "http://example.com",
        "http://example.org",
        "http://example.net"
    ],
    "threshold": 3,
    "interval": 60
}

urls: An array of website URLs to monitor.
threshold: The number of consecutive failures before triggering an alert. For example, if the threshold value is 3, the application will alert after 3 consecutive failures.
interval: The interval time, in seconds, for checking the websites. For example, if the interval value is 60, the application will check the websites every 60 seconds.

Feel free to modify the config.json file with your desired configurations.
