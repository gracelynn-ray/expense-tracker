# Use the official Node.js image.
FROM node:18

# Set the working directory inside the container.
WORKDIR /app

# Copy the package.json and package-lock.json (if it exists).
COPY ./package.json ./package-lock.json /app/

# Install Node.js dependencies.
RUN npm install

# Copy the rest of the Next.js app code into the container.
COPY . /app

# Expose the port that Next.js will run on.
EXPOSE 3000

# Start the Next.js development server.
CMD ["npm", "run", "dev"]