<template>
  <v-layout>
    <v-navigation-drawer expand-on-hover rail>
      <v-list>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
          title="Sandra Adams"
          subtitle="sandra_a88@gmailcom"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <RouterLink to="/">
          <v-list-item
            title="Dashboard"
            prepend-icon="$dashboard"
            value="dashboard"
          ></v-list-item
        ></RouterLink>
        <RouterLink to="/books">
          <v-list-item
            title="Books"
            prepend-icon="$books"
            value="books"
          ></v-list-item></RouterLink
        ><RouterLink to="/authors">
          <v-list-item
            title="Authors"
            prepend-icon="$authors"
            value="authors"
          ></v-list-item
        ></RouterLink>
      </v-list>
    </v-navigation-drawer>

    <v-main style="height: 250px"></v-main>
  </v-layout>
</template>
