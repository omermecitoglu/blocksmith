# Blocksmith

Blocksmith is a web application that utilizes React and Bootstrap to provide a user-friendly interface for interacting with a webhook. This README provides an overview of the major components of the application, along with installation and usage instructions.

## Major Components

1. **Playground Component**:
   - A functional component that allows users to input text into a textarea.
   - It has a button that, when clicked, sends the input value to a specified webhook endpoint using a POST request.
   - It utilizes state management to handle input value changes and submission status.

2. **AppLayout Component**:
   - A layout component that wraps the main content in a Bootstrap container.
   - It receives children components as props and displays them in a structured format.

3. **Page Component**:
   - The main page of the application that includes a header and conditionally renders the Playground component during development.
   - It also imports and displays a thumbs-up icon from FontAwesome.

4. **RootLayout Component**:
   - A layout component that serves as the root for the application.
   - It wraps the children components in a complete HTML structure, including the language attribute for accessibility.

5. **Custom Bootstrap Styles**:
   - The application includes a custom Bootstrap SCSS file that imports Bootstrap's default styles and allows for customization through variable overrides and additional style imports.

## Installation

To set up and run Blocksmith locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/blocksmith.git
   cd blocksmith
   ```

2. **Install Dependencies**:
   Make sure you have Node.js and npm installed. Then run:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   If your application requires specific environment variables (like a webhook URL), create a `.env` file in the root directory and add the necessary variables.

4. **Run the Development Server**:
   Start the development server using:
   ```bash
   npm run dev
   ```

5. **Access the Application**:
   Open your browser and go to `http://localhost:3000` to see the application in action.

## Usage

- **Using the Playground**:
  - On the main page, you will see a textarea labeled "Playground."
  - Enter your desired input in the textarea.
  - Click the "Shoot" button to send the input data to the specified webhook endpoint.
  - You will receive an alert message saying "done" upon successful submission.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any improvements or bug fixes.

---

This README should provide a clear understanding of the Blocksmith application, covering its main components, installation steps, and usage instructions.