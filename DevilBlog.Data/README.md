// remove migrations
dotnet ef migrations remove -s ..\DevilBLog.WebAPI
// add migrations
dotnet ef migrations add InitialCreateDB --startup-project ..\DevilBLog.WebAPI
// OR:
dotnet ef migrations add InitialCreateDB -s ..\DevilBLog.WebAPI