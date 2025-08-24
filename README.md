# Financial Frontend Application

This is a financial frontend application built with Ionic React, TypeScript, and Tailwind CSS. The application provides features for stock analysis, portfolio management, and financial research.

## Features

- User authentication (login/register)
- Dashboard with quick actions and tasks
- Topic selection for different financial analyses
- Interactive chat with AI assistant
- Responsive design for both mobile and desktop
- Light/Dark mode support

## Project Structure

```
src/
├── components/
│   └── common/
│       ├── Header.tsx
│       └── Footer.tsx
├── pages/
│   ├── Dashboard.tsx
│   ├── auth/
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   └── chat/
│       ├── TopicSelection.tsx
│       └── Chat.tsx
├── theme/
│   └── variables.css
├── App.tsx
├── main.tsx
└── ...
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd financial-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Building for Production

To create a production build:
```bash
npm run build
```

### Previewing the Production Build

To preview the production build locally:
```bash
npm run preview
```

## Development

### Adding New Pages

1. Create a new page component in `src/pages/`
2. Add the route in `src/App.tsx`
3. Update the navigation as needed

### Styling

The application uses Tailwind CSS for styling. Custom styles can be added in:
- `src/theme/variables.css` for global variables
- Component-specific classes directly in the JSX

### Components

Reusable components are located in `src/components/common/`. To create a new component:

1. Create a new file in the components directory
2. Export the component as a default export
3. Import and use the component in pages

## Routing

The application uses React Router for navigation. Routes are defined in `src/App.tsx`. Each page component handles its own routing logic where needed.

## Technologies Used

- [Ionic React](https://ionicframework.com/docs/react)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.