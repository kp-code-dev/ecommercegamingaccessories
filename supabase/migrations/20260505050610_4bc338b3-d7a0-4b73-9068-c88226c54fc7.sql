INSERT INTO public.user_roles (user_id, role)
VALUES ('1f922122-fa42-4f6a-89da-671095201bcc', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;