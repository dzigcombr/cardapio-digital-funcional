# Architecture
- Keep the Foodgo ordering experience frontend-only with session state and URL query views; checkout is demonstrative until an actual order service is requested.
- Keep menu data and cart calculations in a shared typed module and render original menu images through asset pointers.