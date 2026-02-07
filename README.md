1) project structure ready::
->app-store.js
->components-navbar and side bar
->constant->if you need to define constst insde it
->feature-all the slice made in the features
->layout-adminlayout(adminnavbar and outlet) similarly for others
->pages->all pages ready or build in the pages directory
->routes->make the global routes for the all pages
->service-> the service folder define axos all methods like put get mapping etc
-

2) Project structre follows

<main>
    <app>
        <AppRoute>
        <Routes>
            <Route element={<UserLayout />}>
                <Route path="/" element={<Home />} />
            </Route>
             <AppRoute>
    </app>
</main>
