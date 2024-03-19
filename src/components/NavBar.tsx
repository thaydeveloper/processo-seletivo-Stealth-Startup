import { AppBar, Toolbar, Typography, Button } from "@mui/material";

function Navbar() {
  return (
    <AppBar position="fixed" sx={{ zIndex: 1200 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Minha Aplicação
        </Typography>
        <Button color="inherit">Link 1</Button>
        <Button color="inherit">Link 2</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
