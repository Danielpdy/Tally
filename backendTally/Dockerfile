#Stage 1: Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build

WORKDIR /app

#restore
COPY ["backendTally.csproj", "."]
RUN dotnet restore 'backendTally.csproj'

#build
COPY . .
RUN dotnet build 'backendTally.csproj' -c Release -o /app/build

# Stage 2: Publish stage
FROM build as publish
RUN dotnet publish 'backendTally.csproj' -c Release -o /app/publish

# Stage 3: Run Stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT [ "dotnet", "backendTally.dll" ]
