import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { routers } from "../routers/router";

const Components = {}

routers.forEach(route => {
    Components[route.component] = lazy(() => import(`../pages/${route.component}`))
})

console.log(Components)

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Suspense fallback="Loading...">
                <Switch>
                    {
                        routers.map((r, index) => (
                            <Route
                                key={index}
                                exact
                                path={r.path}
                                component={Components[r.component]}
                            />
                        ))
                    }
                </Switch>
            </Suspense>
        </BrowserRouter>
    )
}

export default AppRouter