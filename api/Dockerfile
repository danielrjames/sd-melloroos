#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["api.Web/api.Web.csproj", "api.Web/"]
COPY ["api.Services/api.Services.csproj", "api.Services/"]
COPY ["api.Domain/api.Domain.csproj", "api.Domain/"]
COPY ["api.Data/api.Data.csproj", "api.Data/"]
RUN dotnet restore "api.Web/api.Web.csproj"
COPY . .
WORKDIR "/src/api.Web"
RUN dotnet build "api.Web.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "api.Web.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "api.Web.dll"]