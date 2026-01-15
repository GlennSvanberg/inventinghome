$json = @'
{"url":"https://arbetsformedlingen.se/platsbanken/annonser?q=excel&l=3:PVZL_BQT_XtL"}
'@
npx convex run hunter:discover $json
