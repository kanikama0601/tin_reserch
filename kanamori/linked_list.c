#include <stdio.h>
#include <stdlib.h>

struct node {
    int data;
    struct node *next;
};

void display(struct node *head) {
    while (head != NULL) {
        printf("%d ", head -> data);
        head = head -> next;
    }
    printf("\n");
}

struct node* create_node(int data) {
    struct node *n = malloc(sizeof(struct node));
    n -> data = data;
    n -> next = NULL;
    return n;
}

void insert_first(struct node *head, int data) {
    struct node *new_node = create_node(data);
    new_node -> next = head;
    head = new_node;
}

void insert_last(struct node *head, int data) {
    struct node *new_node = create_node(data);
    struct node *ptr = head;
    while (ptr -> next != NULL)
        ptr = ptr -> next;
    ptr -> next = new_node;
}

void insert_before(struct node *head, int data, int key) {
    struct node *new_node = create_node(data);
    struct node *ptr = head, *preptr = head;
    while (ptr -> data != key) {
        preptr = ptr;
        ptr = ptr -> next;
    }
    preptr -> next = new_node;
    new_node -> next = ptr;
}

void insert_after(struct node *head, int data, int key) {
    struct node *new_node = create_node(data);
    struct node *ptr = head, *preptr = head;
    while (preptr -> data != key) {
        preptr = ptr;
        ptr = ptr -> next;
    }
    preptr -> next = new_node;
    new_node -> next = ptr;
}

void delete_first(struct node *head) {
    struct node *ptr = head;
    head = ptr -> next;
    free(ptr);
}

void delete_last(struct node *head) {
    struct node *ptr = head, *preptr = head;
    while (ptr -> next != NULL) {
        preptr = ptr;
        ptr = ptr -> next;
    }
    preptr -> next = NULL;
    free(ptr);
}

void delete_last2(struct node *head) {
    struct node *ptr = head;
    while (ptr -> next -> next != NULL)
        ptr = ptr -> next;
    free (ptr -> next);
    ptr -> next = NULL;
}

void delete_after_key(struct node *head, int key) {
    struct node *ptr = head, *preptr = head;
    while (preptr -> data != key) {
        preptr = ptr;
        ptr = ptr -> next;
    }
    preptr -> next = ptr -> next;
    free(ptr);
}

void delete_key(struct node *head, int key) {
    struct node *ptr = head;
    struct node *preptr = head;
    while (ptr -> data != key) {
        preptr = ptr;
        ptr = ptr -> next;
    }
    preptr -> next = ptr -> next;
    free(ptr);
}

int main() {
    struct node *head = NULL;
    int l[] = {1, 7, 3, 4, 2, 6, 5};

    for (int i = 6; i >= 0; i--) {
        struct node *n = malloc(sizeof(struct node));
        n -> data = 10;
        n -> next = head;
        head = n;
    }

    while (1) {
        printf("1. Insert first\n2. Insert last\n3. Insert before key data\n4. Insert after key data\n5. Display\n6. Exit\n");
        int choice;
        scanf("%d", &choice);
        if (choice == 1) {
            int data;
            printf("Enter data: ");
            scanf("%d", &data);
            insert_first(&head, data);
        } else if (choice == 2) {
            int data;
            printf("Enter data: ");
            scanf("%d", &data);
            insert_last(&head, data);
        } else if (choice == 3) {
            int data, key;
            printf("Enter data and key: ");
            scanf("%d %d", &data, &key);
            insert_before(head, data, key);
        } else if (choice == 4) {
            int data, key;
            printf("Enter data and key: ");
            scanf("%d %d", &data, &key);
            insert_after(head, data, key);
        } else if (choice == 5) {
            display(head);
    }

    return 0;
}